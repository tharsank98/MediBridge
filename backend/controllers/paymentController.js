import crypto from 'crypto';
import Appointment from '../models/appointmentModel.js';

// Utility function to generate PayHere hash
const generatePayHereHash = (merchantId, orderId, amount, currency, merchantSecret) => {
  if (!merchantId || !orderId || !amount || !currency || !merchantSecret) {
    throw new Error('Missing required parameters for hash generation');
  }

  const hashedSecret = crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase();
  const formattedAmount = parseFloat(amount).toFixed(2);
  const hashString = `${merchantId}${orderId}${formattedAmount}${currency}${hashedSecret}`;
  
  return crypto.createHash('md5').update(hashString).digest('hex').toUpperCase();
};

// Verify PayHere payment notification
const verifyPayment = (notification, merchantSecret) => {
  const requiredFields = [
    'merchant_id', 
    'order_id', 
    'payhere_amount', 
    'payhere_currency', 
    'status_code', 
    'md5sig'
  ];

  for (const field of requiredFields) {
    if (!notification[field]) {
      throw new Error(`Missing required field in notification: ${field}`);
    }
  }

  const hashedSecret = crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase();
  const localMd5sig = crypto.createHash('md5')
    .update(
      `${notification.merchant_id}${notification.order_id}${notification.payhere_amount}` +
      `${notification.payhere_currency}${notification.status_code}${hashedSecret}`
    )
    .digest('hex')
    .toUpperCase();

  return localMd5sig === notification.md5sig;
};

// Initiate payment for appointment
export const initiateAppointmentPayment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const userId = req.body.userId;

    // Validate input
    if (!appointmentId || !userId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Appointment ID and user ID are required' 
      });
    }

    // Get and validate appointment
    const appointment = await Appointment.findOne({ 
      _id: appointmentId, 
      userId 
    }).lean();

    if (!appointment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Appointment not found' 
      });
    }

    if (appointment.paymentDetails?.paymentStatus === 'paid') {
      return res.status(409).json({ 
        success: false, 
        message: 'Appointment already paid' 
      });
    }

    // Validate environment variables
    const requiredEnvVars = [
      'PAYHERE_MERCHANT_ID',
      'PAYHERE_MERCHANT_SECRET',
      'BASE_URL',
      'FRONTEND_URL',
      'PAYHERE_CHECKOUT_URL'
    ];

    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
      }
    }

    const {
      PAYHERE_MERCHANT_ID: merchantId,
      PAYHERE_MERCHANT_SECRET: merchantSecret,
      BASE_URL: baseUrl,
      FRONTEND_URL: frontendUrl,
      PAYHERE_CHECKOUT_URL: checkoutUrl
    } = process.env;

    // Generate order ID and hash
    const orderId = `APP-${appointment._id}-${Date.now()}`;
    const amount = appointment.amount;
    const currency = 'LKR';
    const notifyUrl = `${baseUrl}/api/payment/appointment-notify`;

    const hash = generatePayHereHash(
      merchantId,
      orderId,
      amount,
      currency,
      merchantSecret
    );

    // Prepare customer details with validation
    const userData = appointment.userData || {};
    const customerDetails = {
      first_name: (userData.name?.split(' ')[0] || 'Customer').substring(0, 50),
      last_name: (userData.name?.split(' ')[1] || '').substring(0, 50),
      email: (userData.email || 'no-email@example.com').substring(0, 100),
      phone: (userData.phone || '0000000000').substring(0, 20),
      address: (
        `${userData.address?.line1 || ''} ${userData.address?.line2 || ''}`.trim() || 
        'No address'
      ).substring(0, 200),
      city: 'Colombo',
      country: 'Sri Lanka'
    };

    // Prepare payment data
    const paymentData = {
      merchant_id: merchantId,
      return_url: `${frontendUrl}/appointments?payment_success=true&appointmentId=${appointment._id}`,
      cancel_url: `${frontendUrl}/appointments?payment_canceled=true&appointmentId=${appointment._id}`,
      notify_url: notifyUrl,
      order_id: orderId,
      items: `Appointment with Dr. ${appointment.docData?.name || 'Doctor'} on ${appointment.slotDate} at ${appointment.slotTime}`.substring(0, 200),
      amount: amount,
      currency: currency,
      hash: hash,
      custom_1: appointment._id.toString(),
      custom_2: userId,
      ...customerDetails
    };

    // Update appointment in database
    await Appointment.findByIdAndUpdate(
      appointment._id,
      {
        'paymentDetails.orderId': orderId,
        'paymentDetails.paymentStatus': 'pending',
        'paymentDetails.initiatedAt': new Date()
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      paymentData,
      checkoutUrl
    });

  } catch (error) {
    console.error('Payment initiation error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to initiate payment',
      error: error.message 
    });
  }
};

// Handle payment notification for appointments
export const handleAppointmentPaymentNotification = async (req, res) => {
  try {
    if (!process.env.PAYHERE_MERCHANT_SECRET) {
      throw new Error('Missing merchant secret configuration');
    }

    const isValid = verifyPayment(req.body, process.env.PAYHERE_MERCHANT_SECRET);

    if (!isValid) {
      console.warn('Invalid payment notification received:', req.body);
      return res.status(403).send('Invalid payment notification');
    }

    const { 
      order_id, 
      payment_id, 
      payhere_amount, 
      status_code,
      status_message,
      method,
      card_holder_name,
      card_no,
      card_expiry,
      custom_1: appointmentId,
      custom_2: userId
    } = req.body;

    if (!appointmentId || !userId) {
      throw new Error('Missing appointment or user reference in notification');
    }

    // Validate and map status
    const statusMap = {
      '2': 'paid',
      '0': 'pending',
      '-1': 'canceled',
      '-2': 'failed',
      '-3': 'charged_back'
    };

    const paymentStatus = statusMap[status_code] || 'unknown';

    // Prepare update data
    const updateData = {
      payment: paymentStatus === 'paid',
      'paymentDetails.paymentId': payment_id,
      'paymentDetails.paymentMethod': method,
      'paymentDetails.cardHolderName': card_holder_name,
      'paymentDetails.cardNumber': card_no,
      'paymentDetails.cardExpiry': card_expiry,
      'paymentDetails.amount': payhere_amount,
      'paymentDetails.currency': 'LKR',
      'paymentDetails.statusMessage': status_message,
      'paymentDetails.paymentStatus': paymentStatus,
      'paymentDetails.processedAt': new Date(),
      ...(paymentStatus === 'paid' && { 'paymentDetails.paidAt': new Date() })
    };

    // Update appointment
    const updatedAppointment = await Appointment.findOneAndUpdate(
      { _id: appointmentId, userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedAppointment) {
      console.error('Appointment not found for notification:', { appointmentId, userId });
      return res.status(404).send('Appointment not found');
    }

    console.log('Payment processed:', {
      appointmentId,
      status: paymentStatus,
      amount: payhere_amount
    });

    return res.status(200).send('OK');

  } catch (error) {
    console.error('Payment notification processing error:', error);
    return res.status(500).send('Error processing payment notification');
  }
};
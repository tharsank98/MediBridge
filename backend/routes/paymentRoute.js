import express from 'express';
import {
  initiateAppointmentPayment,
  handleAppointmentPaymentNotification
} from '../controllers/paymentController.js';
import authUser from '../middlewares/authUser.js';

const router = express.Router();

// Protected routes (require user authentication)
router.post('/initiate-appointment', authUser, initiateAppointmentPayment);

// Webhook (no auth needed)
router.post('/appointment-notify', express.urlencoded({ extended: true }), handleAppointmentPaymentNotification);

export default router;
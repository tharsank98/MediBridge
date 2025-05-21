import Prescription from '../models/Prescription.js';
import Product from '../models/Product.js';

export const uploadPrescription = async (req, res) => {
  try {
    const { productId, notes } = req.body;
    const fileUrl = req.file.path;
    
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    
    const prescription = new Prescription({
      product: productId,
      fileUrl,
      notes,
      user: req.user?.id
    });
    
    await prescription.save();
    res.status(201).json(prescription);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
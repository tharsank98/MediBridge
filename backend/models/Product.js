import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, enum: ['otc', 'prescription'], required: true },
  description: { type: String, required: true },
  stock: { type: Number, default: 100 }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
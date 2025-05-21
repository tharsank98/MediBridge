import express from 'express';
import { uploadPrescription } from '../controllers/prescriptionController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.post('/', upload.single('prescription'), uploadPrescription);

export default router;
import express from 'express';
import {
  getAllUsers,
  removeUser,
  uploadUserPdf,
} from '../controllers/adminController.js';
import authenticateToken from '../middleware/authMiddleware.js';
import checkAdmin from '../middleware/adminMiddleware.js';
import { pdfUpload } from '../utils/storage.js';

const router = express.Router();

// Admin Access Control routes
router.get('/users', authenticateToken, checkAdmin, getAllUsers);
router.post(
  '/users/:id/pdf',
  authenticateToken,
  checkAdmin,
  pdfUpload.single('pdf'),
  uploadUserPdf
);
router.delete('/users/:id', authenticateToken, checkAdmin, removeUser);

export default router;

import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  uploadProfileImage,
} from '../controllers/userController.js';
import authenticateToken from '../middleware/authMiddleware.js';
import { imageUpload } from '../utils/storage.js';

const router = express.Router();

// User Profile Management routes
router
  .route('/profile')
  .put(authenticateToken, updateUserProfile)
  .delete(authenticateToken, deleteUserProfile);

router.get('/profile/:id', authenticateToken, getUserProfile);
router.post(
  '/profile/image',
  authenticateToken,
  imageUpload.single('profileImage'),
  uploadProfileImage
);

export default router;

import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from '../controllers/userController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

// User Profile Management routes
router
  .route('/profile')
  .put(authenticateToken, updateUserProfile)
  .delete(authenticateToken, deleteUserProfile);

router.get('/profile/:id', authenticateToken, getUserProfile);

export default router;

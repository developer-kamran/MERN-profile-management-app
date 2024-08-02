import express from 'express';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

// Authentication routes
router.post('/signup', register);
router.post('/signin', login);

export default router;

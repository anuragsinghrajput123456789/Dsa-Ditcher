import express from 'express';
import { getUserProfile, updateUserStats } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', protect, getUserProfile);
router.put('/stats', protect, updateUserStats);

export default router;

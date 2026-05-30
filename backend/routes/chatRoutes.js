import express from 'express';
import {
  getChats,
  saveChat,
  deleteChat,
  clearHistory
} from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getChats)
  .post(protect, saveChat)
  .delete(protect, clearHistory);

router.route('/:id').delete(protect, deleteChat);

export default router;

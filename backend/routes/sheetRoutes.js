import express from 'express';
import {
  getSheets,
  createSheet,
  updateSheet,
  deleteSheet,
} from '../controllers/sheetController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getSheets).post(protect, createSheet);
router.route('/:id').put(protect, updateSheet).delete(protect, deleteSheet);

export default router;

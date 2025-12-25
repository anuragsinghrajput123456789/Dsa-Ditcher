const express = require('express');
const router = express.Router();
const {
  getSheets,
  createSheet,
  updateSheet,
  deleteSheet,
} = require('../controllers/sheetController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getSheets).post(protect, createSheet);
router.route('/:id').put(protect, updateSheet).delete(protect, deleteSheet);

module.exports = router;

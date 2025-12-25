const express = require('express');
const router = express.Router();
const {
  getChats,
  saveChat,
  deleteChat,
  clearHistory
} = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getChats)
  .post(protect, saveChat)
  .delete(protect, clearHistory);

router.route('/:id').delete(protect, deleteChat);

module.exports = router;

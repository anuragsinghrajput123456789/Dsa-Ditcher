const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserStats } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/profile', protect, getUserProfile);
router.put('/stats', protect, updateUserStats);

module.exports = router;

const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      level: user.level,
      problemsSolved: user.problemsSolved,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Update user stats (problems solved)
// @route   PUT /api/users/stats
// @access  Private
const updateUserStats = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.problemsSolved = req.body.problemsSolved || user.problemsSolved;
    
    // Simple logic to update level based on solved count
    if (user.problemsSolved >= 50) {
        user.level = 'Advanced';
    } else if (user.problemsSolved >= 20) {
        user.level = 'Intermediate';
    } else {
        user.level = 'Beginner';
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      level: updatedUser.level,
      problemsSolved: updatedUser.problemsSolved,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = { getUserProfile, updateUserStats };

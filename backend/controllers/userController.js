import User from '../models/User.js';

// Helper function to update active streak
const updateStreak = async (user) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (user.lastActiveDate) {
    const lastActive = new Date(user.lastActiveDate);
    lastActive.setHours(0, 0, 0, 0);

    const diffTime = today - lastActive;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      user.streak += 1;
      user.lastActiveDate = today;
      await user.save();
    } else if (diffDays > 1) {
      user.streak = 1;
      user.lastActiveDate = today;
      await user.save();
    }
  } else {
    user.streak = 1;
    user.lastActiveDate = today;
    await user.save();
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    await updateStreak(user);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      level: user.level,
      problemsSolved: user.problemsSolved,
      streak: user.streak,
      lastActiveDate: user.lastActiveDate,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Update user stats (problems solved)
// @route   PUT /api/users/stats
// @access  Private
export const updateUserStats = async (req, res) => {
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

    await updateStreak(user);
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      level: updatedUser.level,
      problemsSolved: updatedUser.problemsSolved,
      streak: updatedUser.streak,
      lastActiveDate: updatedUser.lastActiveDate,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

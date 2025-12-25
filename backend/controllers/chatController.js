const Chat = require('../models/Chat');

// @desc    Get user chat history
// @route   GET /api/chats
// @access  Private
const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user._id }).sort({ createdAt: 1 });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Save a chat message
// @route   POST /api/chats
// @access  Private
const saveChat = async (req, res) => {
  const { role, content } = req.body;

  if (!role || !content) {
    return res.status(400).json({ message: 'Please add role and content' });
  }

  try {
    const chat = await Chat.create({
      user: req.user._id,
      role,
      content,
    });
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a chat message
// @route   DELETE /api/chats/:id
// @access  Private
const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Check for user
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Make sure the logged in user matches the chat user
    if (chat.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await chat.deleteOne();

    res.json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Clear all chat history for user
// @route   DELETE /api/chats
// @access  Private
const clearHistory = async (req, res) => {
  try {
    await Chat.deleteMany({ user: req.user._id });
    res.json({ message: 'History cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getChats,
  saveChat,
  deleteChat,
  clearHistory
};

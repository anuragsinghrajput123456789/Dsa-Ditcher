import mongoose from 'mongoose';

const chatSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  role: {
    type: String,
    enum: ['user', 'ai'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;

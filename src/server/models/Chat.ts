import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IChatDocument extends Document {
  user: mongoose.Types.ObjectId;
  role: 'user' | 'ai';
  content: string;
}

const chatSchema = new Schema<IChatDocument>({
  user: {
    type: Schema.Types.ObjectId,
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

const Chat: Model<IChatDocument> = mongoose.models.Chat || mongoose.model<IChatDocument>('Chat', chatSchema);
export default Chat;

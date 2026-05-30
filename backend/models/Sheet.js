import mongoose from 'mongoose';

const sheetSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  problems: {
    type: String, // Storing as JSON string or raw text for now
    required: false,
    default: "[]"
  },
}, { timestamps: true });

const Sheet = mongoose.model('Sheet', sheetSchema);
export default Sheet;

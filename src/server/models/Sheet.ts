import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISheetDocument extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  description: string;
  problems: string;
  difficulty: string;
  tags: string;
}

const sheetSchema = new Schema<ISheetDocument>({
  user: {
    type: Schema.Types.ObjectId,
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
    type: String,
    required: false,
    default: "[]"
  },
  difficulty: {
    type: String,
    required: false,
    default: "Mixed"
  },
  tags: {
    type: String,
    required: false,
    default: ""
  },
}, { timestamps: true });

sheetSchema.index({ user: 1 });

const Sheet: Model<ISheetDocument> = mongoose.models.Sheet || mongoose.model<ISheetDocument>('Sheet', sheetSchema);
export default Sheet;

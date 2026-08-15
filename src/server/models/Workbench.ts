import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAlgorithmStep {
  id: string;
  stepNumber: number;
  title: string;
  explanation: string;
  note?: string;
}

export interface IWorkbenchDocument extends Document {
  user?: mongoose.Types.ObjectId;
  guestId?: string;
  problemTitle: string;
  problemDifficulty?: string;
  problemDescription?: string;
  constraints?: string;
  examples?: string;
  approachText: string;
  algorithmSteps: IAlgorithmStep[];
  pseudocode: string;
  diagramData: any;
  aiReview?: any;
  complexityAnalysis?: any;
  generatedCode?: {
    language: string;
    code: string;
  };
}

const algorithmStepSchema = new Schema<IAlgorithmStep>({
  id: { type: String, required: true },
  stepNumber: { type: Number, required: true },
  title: { type: String, required: true },
  explanation: { type: String, required: true },
  note: { type: String },
});

const workbenchSchema = new Schema<IWorkbenchDocument>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  guestId: {
    type: String,
  },
  problemTitle: {
    type: String,
    required: true,
    default: 'Two Sum (LeetCode #1)',
  },
  problemDifficulty: {
    type: String,
    default: 'Easy',
  },
  problemDescription: {
    type: String,
    default: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
  },
  constraints: {
    type: String,
    default: '2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\nOnly one valid answer exists.',
  },
  examples: {
    type: String,
    default: 'Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]',
  },
  approachText: {
    type: String,
    default: '',
  },
  algorithmSteps: {
    type: [algorithmStepSchema],
    default: [],
  },
  pseudocode: {
    type: String,
    default: '',
  },
  diagramData: {
    type: Schema.Types.Mixed,
    default: {},
  },
  aiReview: {
    type: Schema.Types.Mixed,
    default: null,
  },
  complexityAnalysis: {
    type: Schema.Types.Mixed,
    default: null,
  },
  generatedCode: {
    language: { type: String, default: 'javascript' },
    code: { type: String, default: '' },
  },
}, { timestamps: true });

const Workbench: Model<IWorkbenchDocument> = mongoose.models.Workbench || mongoose.model<IWorkbenchDocument>('Workbench', workbenchSchema);
export default Workbench;

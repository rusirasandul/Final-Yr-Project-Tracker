import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  stepNumber: { type: Number, required: true },
  title: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Research Formulation', 'PPRS', 'IPD', 'Dissertation', 'Viva Prep'],
    required: true 
  },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'In Progress', 'Completed'], 
    default: 'Pending' 
  },
  evidence: {
    notes: { type: String, default: '' },
    externalUrl: { type: String, default: '' },
    filePath: { type: String, default: '' }
  },
  portalSubmission: {
    portalName: { type: String, default: 'Blackboard' },
    isSubmitted: { type: Boolean, default: false },
    submittedAt: { type: Date },
    submissionReference: { type: String, default: '' }
  }
}, { timestamps: true });

export default mongoose.model('Task', TaskSchema);

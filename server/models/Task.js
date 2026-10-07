import mongoose from 'mongoose';

const LinkSchema = new mongoose.Schema({
  label:    { type: String, required: true },
  url:      { type: String, required: true },
  linkType: {
    type: String,
    enum: ['github', 'overleaf', 'googledocs', 'onedrive', 'blackboard', 'turnitin', 'slides', 'paper', 'dataset', 'other'],
    default: 'other'
  }
}, { _id: true });

const FileSchema = new mongoose.Schema({
  originalName: { type: String },
  filename:     { type: String },   // stored filename (timestamp-original)
  uploadedAt:   { type: Date, default: Date.now }
}, { _id: true });

const ActionSchema = new mongoose.Schema({
  label:       { type: String, required: true },
  category:    { type: String, enum: ['compulsory', 'mandatory', 'optional', 'not_needed', 'custom'], default: 'optional' },
  isCompleted: { type: Boolean, default: false },
  completedAt: { type: Date },
  notes:       { type: String, default: '' },
  isDefault:   { type: Boolean, default: false }
}, { _id: true });

const TaskSchema = new mongoose.Schema({
  stepNumber: { type: Number, required: true },
  title:      { type: String, required: true },
  category: {
    type: String,
    enum: ['Research Formulation', 'PPRS', 'IPD', 'Dissertation', 'Viva Prep'],
    required: true
  },
  description: { type: String, required: true },
  deadline:    { type: Date, required: true },
  status:      { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  notes:       { type: String, default: '' },
  links:       [LinkSchema],
  files:       [FileSchema],
  actions:     [ActionSchema],
  portalSubmission: {
    portalName:           { type: String, default: 'Blackboard' },
    isSubmitted:          { type: Boolean, default: false },
    submittedAt:          { type: Date },
    submissionReference:  { type: String, default: '' }
  }
}, { timestamps: true });

export default mongoose.model('Task', TaskSchema);

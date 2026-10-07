import mongoose from 'mongoose';

const UserProfileSchema = new mongoose.Schema({
  fullName:       { type: String, default: '' },
  studentId:      { type: String, default: '' },
  email:          { type: String, default: '' },
  phone:          { type: String, default: '' },
  university:     { type: String, default: '' },
  department:     { type: String, default: '' },
  programme:      { type: String, default: '' },
  academicYear:   { type: String, default: '' },
  projectTitle:   { type: String, default: '' },
  supervisorName:  { type: String, default: '' },
  supervisorEmail: { type: String, default: '' },
  githubProfile:  { type: String, default: '' },
  overleafProject: { type: String, default: '' },
  blackboardUrl:  { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('UserProfile', UserProfileSchema);

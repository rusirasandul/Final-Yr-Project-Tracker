import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Task from './models/Task.js';
import { ensureStructure } from './modules.js';
import { ensureFypGuidance } from './fypGuidance.js';

dotenv.config();

// Deletes ALL tasks and recreates empty weeks/milestones for every module.
await mongoose.connect(process.env.MONGO_URI);
const { deletedCount } = await Task.deleteMany({});
await ensureStructure();
await ensureFypGuidance();
console.log(`Removed ${deletedCount} old tasks and created empty module weeks.`);
await mongoose.disconnect();

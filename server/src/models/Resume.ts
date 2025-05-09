import mongoose from 'mongoose';
import { IResume } from '../types';

const resumeSchema = new mongoose.Schema<IResume>({
  candidateName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  resumeText: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'qualified', 'rejected'],
    default: 'pending',
  },
  feedback: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IResume>('Resume', resumeSchema); 
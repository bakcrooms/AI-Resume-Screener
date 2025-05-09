import mongoose from 'mongoose';
import { IJob } from '../types';

const jobSchema = new mongoose.Schema<IJob>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: [{
    type: String,
    required: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IJob>('Job', jobSchema); 
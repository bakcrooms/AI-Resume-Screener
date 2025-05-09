import { Document } from 'mongoose';

export interface IJob extends Document {
  title: string;
  description: string;
  requirements: string[];
  createdAt: Date;
}

export interface IResume extends Document {
  candidateName: string;
  email: string;
  jobId: IJob['_id'];
  resumeText: string;
  score: number;
  status: 'pending' | 'reviewed' | 'qualified' | 'rejected';
  feedback: string;
  createdAt: Date;
}

export interface DashboardStats {
  totalCandidates: number;
  totalJobs: number;
  qualifiedCandidates: number;
  pendingReviews: number;
} 
import express, { Request, Response } from 'express';
import Resume from '../models/Resume';
import Job from '../models/Job';
import { DashboardStats } from '../types';

const router = express.Router();

// Get dashboard statistics
router.get('/stats', async (_req: Request, res: Response) => {
  try {
    const [totalCandidates, totalJobs, qualifiedCandidates, pendingReviews] = await Promise.all([
      Resume.countDocuments(),
      Job.countDocuments(),
      Resume.countDocuments({ status: 'qualified' }),
      Resume.countDocuments({ status: 'pending' })
    ]);

    const stats: DashboardStats = {
      totalCandidates,
      totalJobs,
      qualifiedCandidates,
      pendingReviews
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
});

export default router; 
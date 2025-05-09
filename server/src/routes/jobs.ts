import express, { Router, Request, Response } from 'express';
import Job from '../models/Job';
import { IJob } from '../types';

const router: Router = express.Router();

// Get all jobs
router.get('/', async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
});

// Get single job
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
});

// Create job
router.post('/', async (req: Request<{}, {}, Partial<IJob>>, res: Response) => {
  const job = new Job({
    title: req.body.title,
    description: req.body.description,
    requirements: req.body.requirements,
  });

  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
});

// Update job
router.put('/:id', async (req: Request<{ id: string }, {}, Partial<IJob>>, res: Response) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (req.body.title) job.title = req.body.title;
    if (req.body.description) job.description = req.body.description;
    if (req.body.requirements) job.requirements = req.body.requirements;

    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
});

// Delete job
router.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    await job.deleteOne();
    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
});

export default router; 
import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import Resume from '../models/Resume';
import { IResume } from '../types';

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, 'uploads/');
  },
  filename: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Get all resumes
router.get('/', async (_req: Request, res: Response) => {
  try {
    const resumes = await Resume.find()
      .sort({ createdAt: -1 })
      .populate('jobId', 'title');
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
});

// Get resumes by job ID
router.get('/job/:jobId', async (req: Request<{ jobId: string }>, res: Response) => {
  try {
    const resumes = await Resume.find({ jobId: req.params.jobId })
      .sort({ createdAt: -1 })
      .populate('jobId', 'title');
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
});

// Get single resume
router.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const resume = await Resume.findById(req.params.id).populate('jobId', 'title');
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
});

interface UploadResumeBody {
  candidateName: string;
  email: string;
  jobId: string;
  resumeText: string;
  score?: number;
}

// Upload new resume
router.post('/', upload.single('resume'), async (req: Request<{}, {}, UploadResumeBody>, res: Response) => {
  try {
    const resume = new Resume({
      candidateName: req.body.candidateName,
      email: req.body.email,
      jobId: req.body.jobId,
      resumeText: req.body.resumeText,
      score: req.body.score || 0,
      status: 'pending',
    });

    const newResume = await resume.save();
    res.status(201).json(newResume);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
});

interface UpdateStatusBody {
  status: IResume['status'];
  feedback?: string;
}

// Update resume status
router.put('/:id/status', async (req: Request<{ id: string }, {}, UpdateStatusBody>, res: Response) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    resume.status = req.body.status;
    if (req.body.feedback) {
      resume.feedback = req.body.feedback;
    }

    const updatedResume = await resume.save();
    res.json(updatedResume);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
});

export default router; 
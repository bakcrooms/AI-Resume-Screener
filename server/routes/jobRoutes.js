console.log('📦 jobRoutes loaded');
const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ success: true, message: 'Jobs route is working!' });
});

const Job = require('../models/Job');

// POST /api/jobs → Create a new job
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log('📨 Incoming Job Submission:', { title, description });

    if (!title || !description) {
      return res.status(400).json({ success: false, error: 'Title and description required' });
    }

    const keywords = description.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];

    const job = new Job({ title, description, keywords });
    await job.save();

    res.status(201).json({ success: true, job });
  } catch (error) {
    console.error('Job creation failed:', error);
    res.status(500).json({ success: false, error: 'Failed to create job' });
  }
});

// GET /api/jobs → Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json({ success: true, jobs });
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch jobs' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');

// GET /api/admin/job/:jobId/resumes
router.get('/job/:jobId/resumes', async (req, res) => {
  try {
    const jobId = req.params.jobId;

		const mongoose = require('mongoose');

		router.get('/job/:jobId/resumes', async (req, res) => {
			try {
				const jobId = req.params.jobId;
		
				console.log('📥 Incoming jobId:', jobId); // Step 1: Log jobId
		
				const resumes = await Resume.find({
					jobId: new mongoose.Types.ObjectId(jobId)
				});
		
				console.log('📦 Resumes found:', resumes.length); // Step 2: Log results
		
				res.json({
					success: true,
					candidates: resumes.map(resume => ({
						_id: resume._id,
						structured_resume: resume.structured_resume,
						score: resume.score,
						verdict: resume.verdict,
						createdAt: resume.createdAt
					}))
				});
			} catch (error) {
				console.error('❌ Failed to fetch resumes:', error);
				res.status(500).json({ success: false, error: 'Could not fetch candidates' });
			}
		});		

    const resumes = await Resume.find({
    	jobId: new mongoose.Types.ObjectId(jobId)
		});


    res.json({
      success: true,
      candidates: resumes.map(resume => ({
        _id: resume._id,
        structured_resume: resume.structured_resume,
        score: resume.score,
        verdict: resume.verdict,
        createdAt: resume.createdAt
      }))
    });
  } catch (error) {
    console.error('❌ Failed to fetch resumes for job:', error);
    res.status(500).json({ success: false, error: 'Could not fetch candidates' });
  }
});

module.exports = router;

router.get('/ping', (req, res) => {
    res.send('Admin route working!');
  });
  
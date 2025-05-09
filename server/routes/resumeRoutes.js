const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const scoreResume = require('../utils/scoreResume');
const Job = require('../models/Job');
const Resume = require('../models/Resume');

require('dotenv').config();

const upload = multer({ dest: 'uploads/' });

function structureResume(text) {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line !== '');
  
    const sectionKeywords = {
      summary: ['professional summary', 'summary'],
      experience: ['experience', 'work experience', 'employment history'],
      projects: ['projects', 'project experience'],
      skills: ['technical skills', 'skills'],
      education: ['education', 'academic background']
    };
  
    const structured = {
      contact: '',
      summary: '',
      experience: '',
      projects: '',
      skills: '',
      education: ''
    };
  
    let currentSection = 'contact'; // everything before a known section = contact
    const sectionOrder = ['summary', 'experience', 'projects', 'skills', 'education'];
  
    for (let line of lines) {
      const lower = line.toLowerCase();
  
      const matched = sectionOrder.find(section =>
        sectionKeywords[section].some(keyword => lower.includes(keyword))
      );
  
      if (matched) {
        currentSection = matched;
        continue;
      }
  
      structured[currentSection] += line + '\n';
    }
  
    // Trim all fields
    for (let key in structured) {
      structured[key] = structured[key].trim();
    }
  
    return structured;
  }  

router.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    const pdfBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(pdfBuffer);
    fs.unlinkSync(req.file.path);

    const structuredResume = structureResume(data.text);
    let jobKeywords = [];

if (req.body.jobId) {
  try {
    const job = await Job.findById(req.body.jobId);
    if (!job) {
      return res.status(404).json({ success: false, error: 'Job not found' });
    }
    jobKeywords = job.keywords;
  } catch (err) {
    console.error('Error looking up job:', err);
    return res.status(500).json({ success: false, error: 'Failed to retrieve job' });
  }
}

// Send job-specific keywords into scoring function
const { score, verdict, matchedKeywords } = scoreResume(structuredResume, jobKeywords);
const savedResume = new Resume({
    jobId: req.body.jobId,
    structured_resume: structuredResume,
    score,
    verdict
  });
  
  console.log('💾 Saving resume to MongoDB:', {
    jobId: req.body.jobId,
    structured_resume: structuredResume,
    score,
    verdict
  });
  
  await savedResume.save();  

  res.json({
    success: true,
    structured_resume: structuredResume
  });
   

  } catch (error) {
    console.error('Logic-based resume structuring failed:', error);
    res.status(500).json({ success: false, error: 'Failed to parse and structure resume' });
  }
});

module.exports = router;

const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  structured_resume: { type: Object, required: true },
  score: { type: Number, required: true },
  verdict: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', ResumeSchema);

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');
const adminRoutes = require('./routes/adminRoutes');


require('dotenv').config();

app.get('/api/test', (req, res) => {
    res.send('API is working!');
  });
  
app.use(cors());
app.use(express.json());
app.use('/api/jobs', jobRoutes);
app.use('/api/admin', adminRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.get('/test', (req, res) => {
  res.send('API is working!');
});

const resumeRoutes = require('./routes/resumeRoutes');

app.use('/api', resumeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

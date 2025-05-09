# AI Resume Screener 💠
Version 1.0.0

This is a full-stack MERN app that allows businesses to post job listings and automatically screen incoming resumes using structured logic and scoring.

##  Built With

- **MongoDB** – stores job listings and structured resume data  
- **Express** – handles resume uploads and scoring API routes  
- **React** – frontend dashboard for recruiters to view candidates  
- **Node.js** – backend engine  
- **pdf-parse** – extracts text from PDF resumes  
- **Axios** – connects React to the backend API  

---

##  Features

- ✅ Upload resumes and link them to specific jobs  
- ✅ Extract contact info, experience, skills, and education from PDFs  
- ✅ Assign logic-based scores and verdicts (✅ Great, ⚠️ Decent, ❌ Not Qualified)  
- ✅ Save all structured data to MongoDB  
- ✅ Admin dashboard to browse job listings and see matched candidates  
- ✅ Clean, responsive UI with hover cards and modern layout  

---

## 🚀 How to Run It

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/ai-resume-screener.git
cd ai-resume-screener

### 2. Start the backend (Node + Express)


cd server
npm install
node index.js

make sure your .env file contains your MongoDB connection string:

MONGO_URI=your-mongodb-uri
PORT=5000

### 3. Start the frontend (React)
cd ../admin-dashboard
npm install
npm start

React will run at http://localhost:3000 and connect to your backend.

🧠 Future Ideas

Resume improvement suggestions

Recruiter tags and shortlist views

Export resumes to PDF or CSV

Email follow-ups to candidates

Public job page with resume upload form

📫 Contact
Built by bakcrooms
Follow the journey — more projects dropping soon.
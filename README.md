# AI Resume Screener 💠 (TypeScript Edition)
Version 2.0.0

This is a full-stack MERN app with TypeScript implementation that allows businesses to post job listings and automatically screen incoming resumes using structured logic and scoring.

##  Built With

- **TypeScript** - provides type safety and better developer experience
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
- ✅ Full TypeScript implementation for better type safety and developer experience
- ✅ Structured project organization with proper type definitions

---

## 🚀 How to Run It

1. Clone the repo
```bash
git clone https://github.com/bakcrooms/ai-resume-screener.git -b typescript-conversion
cd ai-resume-screener
```

2. Set up environment variables

We've created a setup script to help you configure your environment variables:

```bash
cd server
npm install
npm run setup
```

This interactive script will guide you through setting up your MongoDB connection string and other configuration options.

Alternatively, you can manually create a `.env` file in the server directory with:
```
PORT=5000
MONGO_URI=your-mongodb-connection-string
```

3. Start the backend (Node + Express + TypeScript)
```bash
cd server
npm install
npm run build
npm start
```

For development with auto-reload:
```bash
npm run dev
```

4. Start the frontend (React + TypeScript)
```bash
cd ../client
npm install
npm start
```

React will run at http://localhost:3000 and connect to your backend at http://localhost:5000.

## 🧠 Future Ideas

- Resume improvement suggestions
- Recruiter tags and shortlist views
- Export resumes to PDF or CSV
- Email follow-ups to candidates
- Public job page with resume upload form
- Integration with external job boards and agency systems

## 💻 TypeScript Migration
This project is a TypeScript conversion of the original JavaScript version. Key improvements include:

- Type-safe API contracts between client and server
- Improved developer experience with autocompletion and type checking
- Better error handling with proper type checking
- Clear interface definitions for models and requests
- More maintainable and scalable codebase
- Proper environment variable handling with type safety

## 📫 Contact
Built by bakcrooms  
Follow the journey — more projects dropping soon.
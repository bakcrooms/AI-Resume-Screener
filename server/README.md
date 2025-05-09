# AI Resume Screener - Backend

This is the server component of the AI Resume Screener application, built with Node.js, Express, TypeScript, and MongoDB.

## Environment Setup

1. Create a `.env` file in this directory:

```bash
touch .env
```

2. Add the following to your `.env` file:

```
PORT=5000
MONGO_URI=your-mongodb-connection-string
```

### MongoDB Connection

Replace `your-mongodb-connection-string` with your actual MongoDB connection string:

#### For local MongoDB:
```
MONGO_URI=mongodb://localhost:27017/resume-screener
```

#### For MongoDB Atlas:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/resume-screener
```

⚠️ **IMPORTANT**: Never commit your `.env` file to Git. The `.gitignore` file is already set up to exclude it.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

This will start the server with hot-reloading for development.

## Production Build

```bash
npm run build
npm start
```

The first command compiles TypeScript to JavaScript in the `dist` directory, and the second command starts the server with the compiled code.

## API Documentation

The server exposes the following API endpoints:

### Jobs

- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get a single job
- `POST /api/jobs` - Create a new job
- `PUT /api/jobs/:id` - Update a job
- `DELETE /api/jobs/:id` - Delete a job

### Resumes

- `GET /api/resumes` - Get all resumes
- `GET /api/resumes/job/:jobId` - Get resumes for a specific job
- `GET /api/resumes/:id` - Get a single resume
- `POST /api/resumes` - Upload a new resume
- `PUT /api/resumes/:id/status` - Update resume status

### Dashboard

- `GET /api/dashboard/stats` - Get dashboard statistics 
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export interface Job {
  _id: string;
  title: string;
  description: string;
  requirements: string[];
  createdAt: string;
}

export interface Resume {
  _id: string;
  candidateName: string;
  email: string;
  jobId: string;
  resumeText: string;
  score: number;
  status: 'pending' | 'reviewed' | 'qualified' | 'rejected';
  feedback: string;
  createdAt: string;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const jobsApi = {
  getAll: () => api.get<Job[]>('/jobs'),
  getById: (id: string) => api.get<Job>(`/jobs/${id}`),
  create: (job: Omit<Job, '_id' | 'createdAt'>) => api.post<Job>('/jobs', job),
  update: (id: string, job: Partial<Job>) => api.put<Job>(`/jobs/${id}`, job),
  delete: (id: string) => api.delete(`/jobs/${id}`),
};

export const resumesApi = {
  getAll: () => api.get<Resume[]>('/resumes'),
  getByJobId: (jobId: string) => api.get<Resume[]>(`/resumes/job/${jobId}`),
  getById: (id: string) => api.get<Resume>(`/resumes/${id}`),
  create: (resume: FormData) => api.post<Resume>('/resumes', resume, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  updateStatus: (id: string, status: Resume['status'], feedback?: string) => 
    api.put<Resume>(`/resumes/${id}/status`, { status, feedback }),
};

export const dashboardApi = {
  getStats: () => api.get<{
    totalCandidates: number;
    totalJobs: number;
    qualifiedCandidates: number;
    pendingReviews: number;
  }>('/dashboard/stats'),
  getRecentCandidates: () => api.get<Resume[]>('/dashboard/recent-candidates'),
}; 
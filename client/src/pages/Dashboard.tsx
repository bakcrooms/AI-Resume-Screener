import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress
} from '@mui/material';
import {
  People as PeopleIcon,
  Work as WorkIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { dashboardApi, resumesApi, jobsApi, type Job, type Resume } from '../services/api';

interface DashboardStats {
  totalCandidates: number;
  totalJobs: number;
  qualifiedCandidates: number;
  pendingReviews: number;
}

const StatCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, icon, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ bgcolor: color, mr: 2 }}>
          {icon}
        </Avatar>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="div">
        {value}
      </Typography>
    </CardContent>
  </Card>
);

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [candidates, setCandidates] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsResponse, jobsResponse] = await Promise.all([
          dashboardApi.getStats(),
          jobsApi.getAll()
        ]);
        setStats(statsResponse.data);
        setJobs(jobsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    const fetchCandidates = async () => {
      if (selectedJobId) {
        try {
          setLoading(true);
          const response = await resumesApi.getByJobId(selectedJobId);
          setCandidates(response.data);
        } catch (error) {
          console.error('Error fetching candidates:', error);
        } finally {
          setLoading(false);
        }
      } else {
        const response = await resumesApi.getAll();
        setCandidates(response.data);
      }
    };

    fetchCandidates();
  }, [selectedJobId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        <Box sx={{ flex: '1 1 250px', minWidth: 0 }}>
          <StatCard
            title="Total Candidates"
            value={stats?.totalCandidates || 0}
            icon={<PeopleIcon />}
            color="#1976d2"
          />
        </Box>
        <Box sx={{ flex: '1 1 250px', minWidth: 0 }}>
          <StatCard
            title="Active Jobs"
            value={stats?.totalJobs || 0}
            icon={<WorkIcon />}
            color="#2e7d32"
          />
        </Box>
        <Box sx={{ flex: '1 1 250px', minWidth: 0 }}>
          <StatCard
            title="Qualified"
            value={stats?.qualifiedCandidates || 0}
            icon={<CheckCircleIcon />}
            color="#ed6c02"
          />
        </Box>
        <Box sx={{ flex: '1 1 250px', minWidth: 0 }}>
          <StatCard
            title="Pending Review"
            value={stats?.pendingReviews || 0}
            icon={<ScheduleIcon />}
            color="#9c27b0"
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Box sx={{ flex: '1 1 400px', minWidth: 0 }}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Candidates
              </Typography>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Filter by Job</InputLabel>
                <Select
                  value={selectedJobId}
                  label="Filter by Job"
                  onChange={(e) => setSelectedJobId(e.target.value)}
                >
                  <MenuItem value="">All Jobs</MenuItem>
                  {jobs.map((job) => (
                    <MenuItem key={job._id} value={job._id}>
                      {job.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <List>
              {candidates.map((candidate, index) => (
                <React.Fragment key={candidate._id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>{candidate.candidateName[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={candidate.candidateName}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            Score: {candidate.score}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2">
                            Status: {candidate.status}
                            {candidate.feedback && ` - ${candidate.feedback}`}
                          </Typography>
                        </>
                      }
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => navigate(`/candidates/${candidate._id}`)}
                    >
                      View Details
                    </Button>
                  </ListItem>
                  {index < candidates.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Box>
        
        <Box sx={{ flex: '1 1 400px', minWidth: 0 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <List>
              <ListItem 
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate('/candidates/upload')}
              >
                <ListItemText primary="Upload New Resume" />
              </ListItem>
              <Divider />
              <ListItem 
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate('/jobs/new')}
              >
                <ListItemText primary="Create New Job Listing" />
              </ListItem>
              <Divider />
              <ListItem 
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  setSelectedJobId('');
                  navigate('/candidates?status=pending');
                }}
              >
                <ListItemText primary="View Pending Reviews" />
              </ListItem>
            </List>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}; 
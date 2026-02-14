import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { jobService } from '../services/api';
import CreateJobModal from '../components/CreateJobModal';
import ApplicantsList from '../components/ApplicantsList';
import '../styles/Dashboard.css';

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedJobForApplicants, setSelectedJobForApplicants] = useState(null);
  const { user, token } = useAuth();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await jobService.getAllJobs();
      // Filter jobs created by this recruiter
      const myJobs = data.jobs.filter(job => job.createdBy === user.id);
      setJobs(myJobs);
    } catch (err) {
      console.error('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJob = async (jobData) => {
    try {
      await jobService.createJob(jobData, token);
      setShowCreateModal(false);
      fetchJobs();
      alert('Job created successfully!');
    } catch (err) {
      alert('Failed to create job');
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) {
      return;
    }

    try {
      await jobService.deleteJob(jobId, token);
      fetchJobs();
      alert('Job deleted successfully!');
    } catch (err) {
      alert('Failed to delete job');
    }
  };

  const handleViewApplicants = (job) => {
    setSelectedJobForApplicants(job);
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Recruiter Dashboard</h1>
          <p>Welcome back, {user?.name}!</p>
        </div>
        <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
          + Create New Job
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{jobs.length}</h3>
          <p>Total Jobs Posted</p>
        </div>
      </div>

      <div className="jobs-section">
        <h2>Your Posted Jobs</h2>
        {jobs.length === 0 ? (
          <div className="no-jobs">
            You haven't posted any jobs yet. Click "Create New Job" to get started!
          </div>
        ) : (
          <div className="jobs-table">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Salary</th>
                  <th>Posted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id}>
                    <td><strong>{job.title}</strong></td>
                    <td>{job.company}</td>
                    <td>{job.location}</td>
                    <td>${job.salary?.toLocaleString() || 'Not specified'}</td>
                    <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn-secondary btn-sm"
                        onClick={() => handleViewApplicants(job)}
                      >
                        View Applicants
                      </button>
                      <button
                        className="btn-danger btn-sm"
                        onClick={() => handleDeleteJob(job._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateJobModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateJob}
        />
      )}

      {selectedJobForApplicants && (
        <ApplicantsList
          job={selectedJobForApplicants}
          onClose={() => setSelectedJobForApplicants(null)}
        />
      )}
    </div>
  );
};

export default RecruiterDashboard;

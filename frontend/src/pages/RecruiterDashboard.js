import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { jobService } from '../services/api';
import CreateJobModal from '../components/CreateJobModal';
import ApplicantsList from '../components/ApplicantsList';

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
    return (
      <div className="d-flex justify-content-center align-items-center" style={{minHeight: '400px', marginTop: '70px'}}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{marginTop: '70px'}}>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h1 className="display-5 fw-bold">Recruiter Dashboard</h1>
          <p className="lead text-muted">Welcome back, {user?.name}!</p>
        </div>
        <button className="btn btn-primary btn-lg" onClick={() => setShowCreateModal(true)}>
          + Create New Job
        </button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card text-center border-0 shadow-sm">
            <div className="card-body py-4">
              <h2 className="display-4 text-primary mb-2">{jobs.length}</h2>
              <p className="text-muted mb-0">Total Jobs Posted</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white py-3">
          <h4 className="mb-0">Your Posted Jobs</h4>
        </div>
        <div className="card-body p-0">
          {jobs.length === 0 ? (
            <div className="text-center py-5">
              <p className="lead text-muted mb-0">
                You haven't posted any jobs yet. Click "Create New Job" to get started!
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
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
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => handleViewApplicants(job)}
                        >
                          View Applicants
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
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
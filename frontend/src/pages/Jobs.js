import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { jobService } from '../services/api';
import JobCard from '../components/JobCard';
import ApplyModal from '../components/ApplyModal';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const { user, isApplicant } = useAuth();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await jobService.getAllJobs();
      setJobs(data.jobs);
    } catch (err) {
      setError('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (job) => {
    if (!user) {
      alert('Please login to apply for jobs');
      return;
    }
    if (!isApplicant) {
      alert('Only applicants can apply for jobs');
      return;
    }
    setSelectedJob(job);
    setShowApplyModal(true);
  };

  const handleApplicationSuccess = () => {
    setShowApplyModal(false);
    setSelectedJob(null);
    alert('Application submitted successfully!');
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
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Available Jobs</h1>
        <p className="lead text-muted">Find your dream job from {jobs.length} available positions</p>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {jobs.length === 0 ? (
        <div className="text-center py-5">
          <p className="lead text-muted">No jobs available at the moment</p>
        </div>
      ) : (
        <div className="row g-4">
          {jobs.map((job) => (
            <div key={job._id} className="col-md-6 col-lg-4">
              <JobCard
                job={job}
                onApply={handleApply}
                showApplyButton={isApplicant}
              />
            </div>
          ))}
        </div>
      )}

      {showApplyModal && (
        <ApplyModal
          job={selectedJob}
          onClose={() => setShowApplyModal(false)}
          onSuccess={handleApplicationSuccess}
        />
      )}
    </div>
  );
};

export default Jobs;
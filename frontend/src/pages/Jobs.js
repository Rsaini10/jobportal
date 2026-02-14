import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { jobService } from '../services/api';
import JobCard from '../components/JobCard';
import ApplyModal from '../components/ApplyModal';
import '../styles/Jobs.css';

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
    return <div className="loading">Loading jobs...</div>;
  }

  return (
    <div className="jobs-container">
      <div className="jobs-header">
        <h1>Available Jobs</h1>
        <p>Find your dream job from {jobs.length} available positions</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="jobs-grid">
        {jobs.length === 0 ? (
          <div className="no-jobs">No jobs available at the moment</div>
        ) : (
          jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onApply={handleApply}
              showApplyButton={isApplicant}
            />
          ))
        )}
      </div>

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

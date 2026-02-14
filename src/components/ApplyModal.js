import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { jobService } from '../services/api';
import '../styles/Components.css';

const ApplyModal = ({ job, onClose, onSuccess }) => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { token } = useAuth();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Please upload a PDF file');
        setResume(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB');
        setResume(null);
        return;
      }
      setError('');
      setResume(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!resume) {
      setError('Please upload your resume');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('resume', resume);

      await jobService.applyToJob(job._id, formData, token);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Apply for {job.title}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-body">
          <div className="job-info">
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            {job.salary && <p><strong>Salary:</strong> ${job.salary.toLocaleString()}/year</p>}
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="resume">Upload Resume (PDF only)</label>
              <input
                type="file"
                id="resume"
                accept=".pdf"
                onChange={handleFileChange}
                required
              />
              {resume && (
                <p className="file-info">Selected: {resume.name}</p>
              )}
            </div>

            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;

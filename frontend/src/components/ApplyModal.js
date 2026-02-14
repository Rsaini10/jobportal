import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { jobService } from '../services/api';

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
    <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}} onClick={onClose}>
      <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Apply for {job.title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          
          <div className="modal-body">
            <div className="bg-light p-3 rounded mb-3">
              <p className="mb-2"><strong>Company:</strong> {job.company}</p>
              <p className="mb-2"><strong>Location:</strong> {job.location}</p>
              {job.salary && <p className="mb-0"><strong>Salary:</strong> ${job.salary.toLocaleString()}/year</p>}
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="resume" className="form-label">Upload Resume (PDF only)</label>
                <input
                  type="file"
                  className="form-control"
                  id="resume"
                  accept=".pdf"
                  onChange={handleFileChange}
                  required
                />
                {resume && (
                  <div className="form-text text-success">
                    ✓ Selected: {resume.name}
                  </div>
                )}
              </div>

              <div className="d-flex gap-2">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary flex-grow-1" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Submitting...
                    </>
                  ) : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { jobService } from '../services/api';
import '../styles/Components.css';

const ApplicantsList = ({ job, onClose }) => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const data = await jobService.getJobApplicants(job._id, token);
      setApplicants(data.applications);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch applicants');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'accepted':
        return 'badge-success';
      case 'rejected':
        return 'badge-danger';
      default:
        return 'badge-warning';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Applicants for {job.title}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-body">
          {loading ? (
            <div className="loading">Loading applicants...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : applicants.length === 0 ? (
            <div className="no-data">No applicants yet for this job</div>
          ) : (
            <div className="applicants-table">
              <p className="applicants-count">
                Total Applicants: <strong>{applicants.length}</strong>
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Applied On</th>
                    <th>Status</th>
                    <th>Resume</th>
                  </tr>
                </thead>
                <tbody>
                  {applicants.map((application) => (
                    <tr key={application._id}>
                      <td>{application.applicant?.name || 'N/A'}</td>
                      <td>{application.applicant?.email || 'N/A'}</td>
                      <td>{new Date(application.createdAt).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(application.status)}`}>
                          {application.status}
                        </span>
                      </td>
                      <td>
                        <a
                          href={`http://localhost:5000/${application.resume}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-link"
                        >
                          View Resume
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicantsList;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { jobService } from '../services/api';

const ApplicantsList = ({ job, onClose }) => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    fetchApplicants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        return 'bg-success';
      case 'rejected':
        return 'bg-danger';
      default:
        return 'bg-warning text-dark';
    }
  };

  return (
    <>
      <div 
        className="modal-backdrop show" 
        style={{backgroundColor: 'rgba(0,0,0,0.5)'}}
        onClick={onClose}
      ></div>
      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Applicants for {job.title}</h5>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
            </div>
            
            <div className="modal-body">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3 text-muted">Loading applicants...</p>
                </div>
              ) : error ? (
                <div className="alert alert-danger" role="alert">
                  <strong>Error:</strong> {error}
                </div>
              ) : applicants.length === 0 ? (
                <div className="text-center py-5">
                  <div className="display-1 mb-3">📭</div>
                  <p className="lead text-muted mb-0">No applicants yet for this job</p>
                </div>
              ) : (
                <div>
                  <div className="alert alert-info mb-4">
                    <strong>Total Applicants:</strong> {applicants.length}
                  </div>
                  
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-light">
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
                            <td>
                              <strong>{application.applicant?.name || 'N/A'}</strong>
                            </td>
                            <td>{application.applicant?.email || 'N/A'}</td>
                            <td>
                              {new Date(application.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                              <span className={`badge ${getStatusBadgeClass(application.status)} text-capitalize`}>
                                {application.status}
                              </span>
                            </td>
                            <td>
                              <a href={`http://localhost:5000/${application.resume}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-outline-primary"
                              />
                                View Resume
                            </td>
                              
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicantsList;
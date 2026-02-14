import React from 'react';

const JobCard = ({ job, onApply, showApplyButton }) => {
  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="card-title fw-bold mb-2">{job.title}</h5>
          <span className="badge bg-primary rounded-pill">{job.company}</span>
        </div>
        
        <p className="card-text text-muted mb-3">{job.description}</p>
        
        <div className="mt-auto">
          <div className="d-flex flex-column gap-2 mb-3">
            <div className="d-flex align-items-center text-muted small">
              <span className="me-2">📍</span>
              <span>{job.location}</span>
            </div>
            
            {job.salary && (
              <div className="d-flex align-items-center text-muted small">
                <span className="me-2">💰</span>
                <span>${job.salary.toLocaleString()}/year</span>
              </div>
            )}
            
            <div className="d-flex align-items-center text-muted small">
              <span className="me-2">📅</span>
              <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          {showApplyButton && (
            <button 
              className="btn btn-primary w-100" 
              onClick={() => onApply(job)}
            >
              Apply Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
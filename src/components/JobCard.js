import React from 'react';
import '../styles/Components.css';

const JobCard = ({ job, onApply, showApplyButton }) => {
  return (
    <div className="job-card">
      <div className="job-card-header">
        <h3>{job.title}</h3>
        <span className="company-badge">{job.company}</span>
      </div>
      
      <div className="job-card-body">
        <p className="job-description">{job.description}</p>
        
        <div className="job-details">
          <div className="job-detail-item">
            <span className="icon">📍</span>
            <span>{job.location}</span>
          </div>
          
          {job.salary && (
            <div className="job-detail-item">
              <span className="icon">💰</span>
              <span>${job.salary.toLocaleString()}/year</span>
            </div>
          )}
          
          <div className="job-detail-item">
            <span className="icon">📅</span>
            <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      
      {showApplyButton && (
        <div className="job-card-footer">
          <button className="btn-apply" onClick={() => onApply(job)}>
            Apply Now
          </button>
        </div>
      )}
    </div>
  );
};

export default JobCard;

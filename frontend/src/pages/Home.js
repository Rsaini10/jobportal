import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';

const Home = () => {
  const { isAuthenticated, isRecruiter } = useAuth();

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Find Your Dream Job or Hire Top Talent
          </h1>
          <p className="hero-subtitle">
            Connect with opportunities that match your skills and ambitions
          </p>
          
          <div className="hero-actions">
            {isAuthenticated ? (
              isRecruiter ? (
                <Link to="/recruiter/dashboard" className="btn-hero-primary">
                  Go to Dashboard
                </Link>
              ) : (
                <Link to="/jobs" className="btn-hero-primary">
                  Browse Jobs
                </Link>
              )
            ) : (
              <>
                <Link to="/jobs" className="btn-hero-primary">
                  Browse Jobs
                </Link>
                <Link to="/register" className="btn-hero-secondary">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose Our Job Portal?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Perfect Matches</h3>
            <p>Find jobs that align with your skills and career goals</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Quick Apply</h3>
            <p>Apply to multiple jobs with just one click and your resume</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Top Companies</h3>
            <p>Connect with leading employers actively hiring</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Applications</h3>
            <p>Stay updated on your application status in real-time</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Take the Next Step?</h2>
          <p>Join thousands of job seekers and recruiters on our platform</p>
          {!isAuthenticated && (
            <Link to="/register" className="btn-cta">
              Create Free Account
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

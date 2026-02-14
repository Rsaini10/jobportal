import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, isRecruiter } = useAuth();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="text-white text-center py-5" 
               style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '500px', display: 'flex', alignItems: 'center'}}>
        <div className="container">
          <h1 className="display-3 fw-bold mb-4">
            Find Your Dream Job or Hire Top Talent
          </h1>
          <p className="lead mb-5">
            Connect with opportunities that match your skills and ambitions
          </p>
          
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            {isAuthenticated ? (
              isRecruiter ? (
                <Link to="/recruiter/dashboard" className="btn btn-light btn-lg px-5">
                  Go to Dashboard
                </Link>
              ) : (
                <Link to="/jobs" className="btn btn-light btn-lg px-5">
                  Browse Jobs
                </Link>
              )
            ) : (
              <>
                <Link to="/jobs" className="btn btn-light btn-lg px-5">
                  Browse Jobs
                </Link>
                <Link to="/register" className="btn btn-outline-light btn-lg px-5">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container py-5">
          <h2 className="text-center display-5 fw-bold mb-5">Why Choose Our Job Portal?</h2>
          
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="card-body">
                  <div className="display-4 mb-3">🎯</div>
                  <h5 className="card-title fw-bold">Perfect Matches</h5>
                  <p className="card-text text-muted">
                    Find jobs that align with your skills and career goals
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="card-body">
                  <div className="display-4 mb-3">⚡</div>
                  <h5 className="card-title fw-bold">Quick Apply</h5>
                  <p className="card-text text-muted">
                    Apply to multiple jobs with just one click and your resume
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="card-body">
                  <div className="display-4 mb-3">👥</div>
                  <h5 className="card-title fw-bold">Top Companies</h5>
                  <p className="card-text text-muted">
                    Connect with leading employers actively hiring
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="card-body">
                  <div className="display-4 mb-3">📊</div>
                  <h5 className="card-title fw-bold">Track Applications</h5>
                  <p className="card-text text-muted">
                    Stay updated on your application status in real-time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-white text-center py-5" 
               style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
        <div className="container py-5">
          <h2 className="display-5 fw-bold mb-3">Ready to Take the Next Step?</h2>
          <p className="lead mb-4">Join thousands of job seekers and recruiters on our platform</p>
          {!isAuthenticated && (
            <Link to="/register" className="btn btn-light btn-lg px-5">
              Create Free Account
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
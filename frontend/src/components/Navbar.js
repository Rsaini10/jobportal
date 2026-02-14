import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated, isRecruiter } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="logo-icon">💼</span>
          Job Portal
        </Link>

        <div className="navbar-menu">
          <Link to="/jobs" className="nav-link">
            Browse Jobs
          </Link>

          {isAuthenticated ? (
            <>
              {isRecruiter && (
                <Link to="/recruiter/dashboard" className="nav-link">
                  Dashboard
                </Link>
              )}
              
              <div className="user-menu">
                <span className="user-name">
                  👤 {user?.name}
                  <span className="user-role">({user?.role})</span>
                </span>
                <button className="btn-logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="btn-register">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

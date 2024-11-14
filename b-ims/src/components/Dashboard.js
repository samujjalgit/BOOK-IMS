import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style/dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  const goToSignUp = () => {
    navigate('/register');
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="button-container">
        <button id="btn" onClick={goToLogin}>LogIn</button>
        <button id="btn" onClick={goToSignUp}>SignUp</button>
      </div>
    </div>
  );
}

export default Dashboard;

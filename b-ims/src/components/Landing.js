import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style/landing.css';



function Landing() {
  const navigate = useNavigate();

  const goToLogIn = () => {
    navigate('/login');
  };

  const goToSignUp = () => {
    navigate('/register');
  };

  const goToProfile = () => {
    navigate('/profile');
  }

  return (
    <div className="landing-container">
      <h1 className="landing-title">Dashboard</h1>
      <div className="button-container">
        <button id="btn" onClick={goToLogIn}>LogIn</button>
        <button id="btn" onClick={goToSignUp}>SignUp</button>
      </div>
      <div className = "link-container">
        <button id='btn' onClick={goToSignUp}>Profile</button>
      </div>
    </div>
    
  );
} 
export default Landing;

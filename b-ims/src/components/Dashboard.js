import React from 'react';
// import './style/landing.css';
import './style/Dashboard.css';
import { useNavigate } from 'react-router-dom';
function dashboard(){
  const navigate = useNavigate();

  const goToLanding = () => {
    navigate("/landing");
  }

  const goToProfile = () => {
    navigate("/profile");
  }
  
  return (

    <div className="container">
      <div className="row">
        <div className="header md-12">
          <h1 className="text-center">Welcome to my website</h1>
          <button id="btn" onClick={goToLanding}>Back to LogIn</button>
          <div className="link-container">
            <i className="fa-duotone fa-solid fa-user"
            onClick={goToProfile} ></i>
          </div>
        </div>
      </div>
    </div>
  )
}
export default dashboard;

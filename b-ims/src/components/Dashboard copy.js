import React from 'react';
import './style/landing.css';
import { useNavigate } from 'react-router-dom';
function dashboard(){
  const navigate = useNavigate();

  const goToLanding = () => {
    navigate("/landing");
  }
  
  return (

    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center">Welcome to my website</h1>
          <button id="btn" onClick={goToLanding}>Back to LogIn</button>
        </div>
      </div>
    </div>
  )
}
export default dashboard;

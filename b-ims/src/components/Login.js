import React from "react";
import styled from 'styled-components';
import './style/login.css';
import { useNavigate } from "react-router-dom";
function Login(){
    const navigate = useNavigate();

    const goToDash = () => {
        navigate('/dash');
    };

    return (
    //    <StyledWrapper>
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-left">
          <button className="back-button">Back to website</button>
          <div className="auth-left-content">
            <h2>Capturing Moments, Creating Memories</h2>
          </div>
        </div>
        <div className="auth-right">
          <h2 className="auth-title">Sign in</h2>
          
          <form className="auth-form">
            {/* <div className="form-group"> */}
              <input type="text" placeholder="Username / Email" required />
            {/* </div> */}
            <input type="password" placeholder="Enter your password" required />
            <button type="submit" onClick={goToDash}>Login</button>
            <p>Don't have an account? <a href="/register">SignUp</a></p>
          </form>
          <div className="social-login">
            <button>
              <i className="fab fa-google"></i> Google
            </button>
            <button>
              <i className="fab fa-apple"></i> Apple
            </button>
          </div>
        </div>
      </div>
    </div>
    // {/* </StyledWrapper> */}
  );
}

// const StyledWrapper = styled.div`

export default Login;



    





import React from "react";
import styled from 'styled-components';
import './style/login.css';
import { useNavigate } from "react-router-dom";
function SignUp(){
    const navigate = useNavigate();

    const goToSignup = () => {
      navigate('/register');
    }

    const goToLogIn = () => {
        navigate('/login');
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
          <h2 className="auth-title">Create an account</h2>
          
          <form className="auth-form">
            <div className="form-group">
              <input type="text" placeholder="First Name" required />
              <input type="text" placeholder="Last Name" required />
            </div>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Enter your password" required />
            <div className="terms">
              <input type="checkbox" />
              <p>I agree to the <a href="#">Terms & Conditions</a></p>
            </div>
            <button type="submit" onClick={goToLogIn}>Create account</button>
            <p>Already have an account? <a href="/login">Log in</a></p>
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

export default SignUp;



    





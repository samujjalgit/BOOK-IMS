import React from "react";
import styled from 'styled-components';
import './style/login.css';
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import {toast} from "react-toastify";
function Login(){
  function googleLogin(){
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async(result) => {
      console.log(result);
      if (result.user){
        toast.success('User looged in Successfully', {
          position: "top-center",
        });
        window.location.href = "/profile";
      }
    });
  }
    // const navigate = useNavigate();

    // const goToDash = (event) => {
    //   // event.preventDefault(); 
    //     navigate('/dash');
    // };

    return (
    //    <StyledWrapper>
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-left opacity-100">
        <a href="/landing"><button className="back-button ml-0 " ><i className="fa-solid fa-arrow-left"></i> Back to website </button></a>
          <div className="auth-left-content">
            <h2>Hold the books, hold the stories.</h2>
            
          </div>
        </div>
        <div className="auth-right">
          <h2 className="auth-title">Sign in</h2>
          
          <form className="auth-form" >
            {/* <div className="form-group"> */}
              <input type="text" placeholder="Username / Email" required/>
            {/* </div> */}
            <input type="password" placeholder="Enter your password" required/>
            <button type="submit">Login</button>
            <p>Don't have an account? <a href="/register"><b>SignUp</b></a></p>
          </form>
          <div className="social-login">
            <button onClick={googleLogin}>
              <i className="fab fa-google"></i> Google
            </button>
            {/* <button>
              <i className="fab fa-apple"></i> Apple
            </button> */}
          </div>
        </div>
      </div>
    </div>
    // {/* </StyledWrapper> */}
  );
}

// const StyledWrapper = styled.div`

export default Login;



    





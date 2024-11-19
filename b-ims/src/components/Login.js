import React, { useState } from "react";
import "./style/login.css";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        toast.error("Please verify your email before logging in.", { position: "top-center" });
        return;
      }

      toast.success("Login successful!", { position: "top-center" });
      navigate("/profile"); // Redirect to the profile page
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
    }
  };

  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        console.log(result);
        if (result.user) {
          toast.success("Google login successful!", { position: "top-center" });
          window.location.href = "/profile";
        }
      })
      .catch((error) => {
        toast.error(error.message, { position: "top-center" });
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-left opacity-100">
          <a href="/landing">
            <button className="back-button ml-0">
              <i className="fa-solid fa-arrow-left"></i> Back to website
            </button>
          </a>
          <div className="auth-left-content">
            <h2>Hold the books, hold the stories.</h2>
          </div>
        </div>
        <div className="auth-right">
          <h2 className="auth-title">Sign in</h2>

          <form className="auth-form" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
            <p>
              Don't have an account? <a href="/register">
                <b>Sign Up</b>
              </a>
            </p>
          </form>
          <div className="social-login">
            <button onClick={googleLogin}>
              <i className="fab fa-google"></i> Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import "./style/login.css";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { toast } from "react-toastify";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName) {
      toast.error("First and Last Name are required!", { position: "top-center" });
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);
      toast.success("Registration successful! Check your email for verification.", { position: "top-center" });
      navigate("/login");
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-left">
          <a href="/landing">
            <button className="back-button ml-0">
              <i className="fa-solid fa-arrow-left"></i> Back to website
            </button>
          </a>
          <div className="auth-left-content">
            <h2>Hold the books, Hold the stories.</h2>
          </div>
        </div>
        <div className="auth-right">
          <h2 className="auth-title">Create an account</h2>

          <form className="auth-form" onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
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
            <div className="terms">
              <input type="checkbox" required />
              <p>
                I agree to the <a href="#">Terms & Conditions</a>
              </p>
            </div>
            <button type="submit">Create account</button>
            <p>
              Already have an account? <a href="/login">Log in</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

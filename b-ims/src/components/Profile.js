import React, { useState, useEffect } from "react";
import { auth } from "./firebase"; // Ensure firebase is set up correctly
import "./style/profile.css";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [profileName, setProfileName] = useState("");
  //only needed when we want to set status
//   const [status, setStatus] = useState("");
//   const [aboutMe, setAboutMe] = useState("");

  const fetchUserData = async () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserDetails(user);
        setProfileName(user.displayName || "User");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out: ", error.message);
    }
  };

  const handleDashboard = () => {
    window.location.href = "/dash";
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        {userDetails ? (
          <>
            <div className="profile-header">
              <img
                src={userDetails.photoURL}
                alt="Profile"
                className="profile-pic"
                referrerpolicy="no-referrer"
              />
              {/* <div className="profile-buttons">
                <button className="change-btn">Change picture</button>
                <button className="delete-btn">Delete picture</button>
              </div> */}
            </div>

            <div className="profile-form">
              <label>Username</label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
              />

              <label>Email</label>
              <input
                type="text"
                value={userDetails.email} // Example username
                readOnly
              />
              <button className="save-btn" onClick={handleDashboard}>
                Go to Dashboard
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Profile;

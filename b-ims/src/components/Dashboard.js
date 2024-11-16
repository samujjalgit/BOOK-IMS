import React from 'react';
// import './style/landing.css';
import './style/Dashboard.css';
import './style/landing.css';
import { useNavigate } from 'react-router-dom';
function dashboard(){
  const navigate = useNavigate();

  const goToAddEditBook = () => {
    navigate("/add-edit-book");
  }
  const goToProfile = () => {
    navigate("/profile");
  }
  
  return (
    <div className="dashboard-container">
    {/* Header Section */}
    <header className="dashboard-header">
      <h1 className="dashboard-title">B-IMS</h1>
      <nav className="dashboard-nav">
        <button onClick={goToAddEditBook}>Inventory</button>
        <button onClick={goToProfile}>Profile</button>
      </nav>
    </header>

    {/* Main Content */}
    <main className="dashboard-main">
      
    </main>
  </div>
  )
}
export default dashboard;

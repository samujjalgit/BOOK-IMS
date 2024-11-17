import React from "react";
import "./style/About.css";
import { useNavigate } from "react-router-dom";
import Accenture from './images/accenture.png';
import GirlImg from './images/girl_book.png';

function About() {
    const navigate = useNavigate();

    const goToDash = () => {
        navigate("/dash");
    }

    const goToProfile = () => {
        navigate("/profile");
    }
  return (
    <div className="about-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">B-IMS</h1>
        <nav className="dashboard-nav">
          <button className="dropdown" onClick= {goToDash}>
              Dashboard
            </button>
          <button onClick={goToProfile}>Profile</button>
        </nav>
      </header>
      {/* Hero Section */}
      <section className="hero">
        <div className="badge">📚 BOOKS SIMPLIFIED</div>
        <h1>
          Book <span className="highlight">Inventory Management</span><br/>with Ease
        </h1>
        <p className="hero-description">
          Manage, organize your inventory with precision.
        </p>
        <img src = {GirlImg} alt="3d-img"></img>
      </section>

      {/* Trusted By Section */}
      <section className="trusted-by">
        <h4>TRUSTED BY</h4>
        <div className="trusted-logos">
          <img src={Accenture} alt="accenture" />
          <img src={Accenture} alt="accenture" />
          <img src={Accenture} alt="accenture" />
          <img src={Accenture} alt="accenture" />
        </div>
      </section>
    </div>
  );
}

export default About;

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
          <button className="dropdown" onClick={goToProfile}>Profile</button>
        </nav>
      </header>
  
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">
        Expl🔎re your stories <br /> at our book📖shelf.
      </h1>
      <p className="hero-subtitle">
        Get the cleanest book inventory system
      </p>
      <div className="hero-email-signup">
        <input
          type="email"
          placeholder="Your Email"
          className="email-input"
        />
        <button className="signup-btn">Contact</button>
      </div>
    </section>
      {/* From Uiverse.io by gharsh11032000 */ }
      <div class = "cards-container">
      <div class="card">
        <div class="content">
          
          <p class="para">
            <h1>📝</h1>
          Easily add book details like title, author, genre, price, stock, and description. Keep your inventory updated with just a few clicks.
          </p>
        </div>
      </div>
      <div class="card">
        <div class="content">
          <p class="para">
            <h1>📊</h1>
          Keep your inventory organized by editing existing book details or removing books that are no longer available. Simplify inventory management with minimal effort.
          </p>
        </div>
      </div>
      <div class="card">
        <div class="content">
          
          <p class="para">
            <h1>🔎</h1>
          Browse all the books in your inventory in one place. Quickly check book details like stock, price, and description to stay on top of your inventory.
          </p>
        </div>
      </div>
      </div>



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




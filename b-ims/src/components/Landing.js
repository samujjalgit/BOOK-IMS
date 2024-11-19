import React from 'react';
import './style/landing.css';
import { useNavigate } from 'react-router-dom';
import GirlBookImage from './images/girl_book_2.png';


function Landing() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const goToSignUp = () => {
    navigate("/register");
  };

  return (
    <div className="landing">
      {/* Header Section */}
      <header className="dashboard-header">
        <h1 className="dashboard-title">B-IMS</h1>
        <nav className="dashboard-nav">
          <button onClick={goToLogin}>LogIn</button>
          <button onClick={goToSignUp}>SignUp</button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="headline">
          <h2>READ & LOVE</h2>
          <p className="subheading">More knowledge in less time</p>
        </div>
        
        {/* Illustration and Info Cards */}
        <div className="content-section">
          <div className="character-illustration">
              <img src={GirlBookImage}></img>
          </div>
        
        </div>

        {/* Call to Action */}
        <div className="call-to-action">
          <p>Check your inventory</p>
          <button className="cta-button" onClick={goToLogin}>Get Started</button>
        </div>
      </main>
    </div>
  );
}

export default Landing;




// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './style/landing.css';

// function Landing() {
//   const navigate = useNavigate();

//   const goToLogIn = () => {
//     navigate('/login');
//   };

//   const goToSignUp = () => {
//     navigate('/register');
//   };

//   const goToProfile = () => {
//     navigate('/profile');
//   }

//   return (
//     <div className="landing-container">
//       <header className="landing-header">
//         <h1 className="landing-title">B-IMS</h1>
//       </header>

//       <div className="button-container">
//         <button id="btn" onClick={goToLogIn}>LogIn</button>
//         <button id="btn" onClick={goToSignUp}>SignUp</button>
//       </div>

      
//     </div>
//   );
// } 
// export default Landing;

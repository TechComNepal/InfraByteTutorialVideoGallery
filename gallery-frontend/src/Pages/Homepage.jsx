import React from "react";
import "../Assets/Css/Homepage.css";
import { useNavigate } from "react-router-dom";

function Homepage() {
  let navigate = useNavigate();
  return (  
    <div className="home-page">
      <div className="overlay">
        <div className="inner-container">
          <h6 className="heading1">Enroll Video Course</h6>
          <h1 className="heading2 mt-2">InfraByte videos are ready to play</h1>

          <button
            className="login-container mt-4"
            onClick={() => {
              navigate("/videos");
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;

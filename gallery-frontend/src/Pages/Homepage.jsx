import React from "react";
import "../Assets/Css/Homepage.css";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import LoginPage from "./LoginPage";

function Homepage() {
  let navigate = useNavigate();
  return (  
    <div className="d-flex">
    <div className="home-page ">
      <div className="overlay">
        <div className="inner-container">
        <div>  
        <h6 className="heading1">Enroll InfraByte Videos</h6>
          <h1 className="heading2 mt-2 mb-4">InfraByte videos are ready to play</h1>
          
          <a
            className="button-container "
           href="https://infrabyte.com.au/"
          >
            Visit site
          </a>
        </div>
        
        </div>
     
      </div>
    </div>
            <LoginPage/>
    </div>
  );
}

export default Homepage;

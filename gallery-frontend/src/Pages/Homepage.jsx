import React, { useState } from "react";
import "../Assets/Css/Homepage.css";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import LoginPage from "./LoginPage";

function Homepage() {

  return (
    <div className="home-container">
      <div className="home-page ">
        <div className="overlay">
          <div className="inner-container">
            <div>
              <h6 className="heading1">InfraByte Videos</h6>
              <h1 className="heading2 mt-3 mb-5">
                InfraByte videos are ready to play
              </h1>

              <a
                className="button-container hide-container"
                href="https://infrabyte.com.au/"
                target="_blank"
              >
                Visit Site
              </a>
              <a
                className="button-container hide-container mx-3"
                href="https://app.infrabyte.com.au/"
                target="_blank"
              >
                  Visit App
              </a>
            </div>
          </div>
        </div>
      </div>

      <LoginPage />
    </div>
  );
}

export default Homepage;

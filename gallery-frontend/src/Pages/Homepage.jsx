import React, { useCallback, useEffect, useState } from "react";
import "../Assets/Css/Homepage.css";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import LoginPage from "./LoginPage";
import { useAuth } from "oidc-react";
import logo from "../Assets/images/nonon.png";

function Homepage() {
  const loginUrl =
    "https://security.staging.infrabyte.com.au/connect/authorize?client_id=jobbookingapi_mobile_app&redirect_uri=a1mobile://a1Express.oidc.callback&response_type=code&scope=openid profile email jobbookingapi offline_access&state=csNy5mgU34TE&code_challenge=utgsA1TDCS8tj3Z3ld5eHs68hBtMCWJ5kbm21Rd7QnI&code_challenge_method=S256";

  let navigate = useNavigate();
  const auth = useAuth();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Error: {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return <div>Welcome, {auth.user.profile.name}!</div>;
  }

  // var handleLogin= useCallback(
  //   async (event)=>{
  //     event.preventDefault();

  //       // window.open(loginUrl);

  //     // const response= await fetch(loginUrl,{method:'GET'})
  //     // console.log(response)
  //   }
  // );

  var handleLogin = async () => {

    const result =await auth.signIn;
    
  };

  // useEffect(()=>{
  //   const isRedirect = ["a1mobile://a1Express.oidc.callback"].includes(window.location.href);
  //   if(isRedirect)
  //     navigate("/videos");
  // });

  return (
    <div className="home-container">
      <div className="home-page ">
        <div className="overlay">
          <div className="inner-container ">
            <div style={{marginTop:'28%'}} className="container">
              <h6 className="heading1">Welcome to  <span className="title-color">InfraByte</span> Videos</h6>
              <h1 className="heading2 mt-3 mb-5">
                <span><img src={logo} alt="logo" width="100" hight="100" /></span> videos are ready to play .
              </h1>

              {/* <a
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
              </a> */}
              <button
                className="button-container  mx-0"
                // href={loginUrl}
                // onClick={auth.signIn}
                onClick={ auth.signIn}
       
              >
                Get Started
              </button>
             
            </div> <p className="my-5 ">
          <strong style={{color:"black"}}>
            Powered by <a href="https://infrabyte.com.au/" style={{color:"white"}}>Infrabyte</a>
          </strong>
        </p>
          </div>
        </div>
      </div>
      {/* <LoginPage /> */}
    </div>
  );
}

export default Homepage;

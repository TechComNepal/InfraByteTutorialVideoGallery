import React, { useEffect, useState } from "react";

import "../Assets/Css/Loading.css";
import { isAuthenticatedUser } from "../services/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { oidcConfig } from "../config/config";
import { jwtDecode } from "jwt-decode";

const Loading = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const useQuery = () => {  
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);

      const code = query.get("code");
      if (code) {
        console.log("Authorization code:", code);
        // connect/token
        localStorage.setItem("token", code);
        // const item = window.sessionStorage.getItem(
        //   `oidc.user:${oidcConfig.authority}:react_tutorial_client`
        // );
        // if(item!=null){
        //   var token = jwtDecode(JSON.parse(item)["access_token"]);
        //   // console.info(JSON.stringify(item["access_token"]));
        //   localStorage.setItem(token["http://schemas.a1gaas.com/identity/claims/name"])
        // }
        
        navigate("/videos",{replace:true});
       
      }
    }, 2000);
  }, [navigate]);

  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Please wait ...</p>
    </div>
  );
};

export default Loading;

import React, { useEffect, useState } from "react";

import "../Assets/Css/Loading.css";
import { isAuthenticatedUser } from "../services/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { getTokenUrl, oidcConfig } from "../config/config";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Cookies from "js-cookie";

const Loading = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();

  useEffect(() => {
    // setTimeout(() => {

    const code = query.get("code");
    if (code) {
      // console.log("Authorization code:", code);

      localStorage.setItem("code", code);
      getToken(code);
    } else {
      setLoading(false);
      navigate("/", { replace: true });
    }
    //  else {
    //   // const item = sessionStorage.getItem(
    //   //   `oidc.user:${oidcConfig.authority}:react_tutorial_client`
    //   // );
    //   // if (item != null) { setLoading(false);
    //   //   navigate("/videos",{replace:true});
    //   // }
    // }
    // }, 3000);
  }, [navigate]);

  const getToken = async (code) => {
    const codeVerifier = Cookies.get("pkce_code_verifier");
    // const tokenParams = new URLSearchParams();
    // tokenParams.append("grant_type", "authorization_code");
    // tokenParams.append("client_id", oidcConfig.clientId);
    // tokenParams.append("code", code);
    // tokenParams.append("redirect_uri", oidcConfig.redirectUri);
    // tokenParams.append("code_verifier", codeVerifier);

    var payload = {
      grant_type: "authorization_code",
      client_id: oidcConfig.clientId,
      code: code,
      redirect_uri: oidcConfig.redirectUri,
      code_verifier: codeVerifier,
    };

    await axios
      .post(getTokenUrl, payload, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        const accessToken =
          process.env.REACT_APP_ENVIRONMENT != "dev"
            ? response.data.access_token
            : "eyJhbGciOiJSUzI1NiIsImtpZCI6IjcwNjc5RDUyNUE5NEVFNDExRjFFRDg4NUZDNzI4ODVEIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE3MjA2Njg0NTEsImV4cCI6MTcyMDczMzI1MSwiaXNzIjoiaHR0cHM6Ly9zZWN1cml0eS5zdGFnaW5nLmluZnJhYnl0ZS5jb20uYXUiLCJhdWQiOiJqb2Jib29raW5nYXBpIiwiY2xpZW50X2lkIjoicmVhY3RfdHV0b3JpYWxfY2xpZW50Iiwic3ViIjoiYjA2YmE5ZmMtMGJmNC00YzNiLWIxMmItZWQ5Njg4MDE5OGYyIiwiYXV0aF90aW1lIjoxNzIwNjY4NDI4LCJpZHAiOiJsb2NhbCIsImh0dHA6Ly9zY2hlbWFzLmExZ2Fhcy5jb20vaWRlbnRpdHkvY2xhaW1zL2Z1bGxOYW1lIjoiTmlyYWogIExBTUEiLCJodHRwOi8vc2NoZW1hcy5hMWdhYXMuY29tL2lkZW50aXR5L2NsYWltcy91c2VyTmFtZSI6Ik5pcmFqLkxhbWEiLCJodHRwOi8vc2NoZW1hcy5hMWdhYXMuY29tL2lkZW50aXR5L2NsYWltcy9maXJzdE5hbWUiOiJOaXJhaiIsImh0dHA6Ly9zY2hlbWFzLmExZ2Fhcy5jb20vaWRlbnRpdHkvY2xhaW1zL21pZGRsZU5hbWUiOiIiLCJodHRwOi8vc2NoZW1hcy5hMWdhYXMuY29tL2lkZW50aXR5L2NsYWltcy9sYXN0TmFtZSI6IkxhbWEiLCJodHRwOi8vc2NoZW1hcy5hMWdhYXMuY29tL2lkZW50aXR5L2NsYWltcy9lbWFpbEFkZHJlc3MiOiJuc3ciLCJodHRwOi8vc2NoZW1hcy5hMWdhYXMuY29tL2lkZW50aXR5L2NsYWltcy9tb2JpbGVObyI6Ijk4NjkzNDQxMjEiLCJodHRwOi8vc2NoZW1hcy5hMWdhYXMuY29tL2lkZW50aXR5L2NsYWltcy90ZW5hbnRJZCI6IjkzNjU5MDc4LWI5NTktNDIxYS05MTg0LTlhMjY0ODVlMzYzYiIsImh0dHA6Ly9zY2hlbWFzLmExZ2Fhcy5jb20vaWRlbnRpdHkvY2xhaW1zL2JyYW5jaGNvZGUiOiIxMDAwMDE0IiwiaHR0cDovL3NjaGVtYXMuYTFnYWFzLmNvbS9pZGVudGl0eS9jbGFpbXMvYnJhbmNoaWQiOiIxZGU0ZjkzMy04ODNjLTRmOWUtMjIwNi0wOGRjMzRmY2ExZTciLCJodHRwOi8vc2NoZW1hcy5hMWdhYXMuY29tL2lkZW50aXR5L2NsYWltcy9icmFuY2huYW1lIjoiTmV3Y2FzdGxlIEJyYW5jaCIsImh0dHA6Ly9zY2hlbWFzLmExZ2Fhcy5jb20vaWRlbnRpdHkvY2xhaW1zL0lzU3Vic2NyaXB0aW9uQWN0aXZlIjoiZmFsc2UiLCJodHRwOi8vc2NoZW1hcy5hMWdhYXMuY29tL2lkZW50aXR5L2NsYWltcy9kZWZhdWx0VGltZVpvbmVJZCI6IkF1c3RyYWxpYS9TeWRuZXkiLCJodHRwOi8vc2NoZW1hcy5hMWdhYXMuY29tL2lkZW50aXR5L2NsYWltcy9icmFuY2hUaW1lWm9uZUlkIjoiQXVzdHJhbGlhL1N5ZG5leSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJJRkIwMDAwOC1jMTk0NS1Nb2JpbGUgQXBwIEFkbWluIiwiU3VwZXIgQWRtaW4iLCJJRkIwMDAwOC1jMTk0NS1JRkIwMDAwOC1jMTk0NS1XZWIgQXBwIEFkbWluIl0sImh0dHA6Ly9zY2hlbWFzLmExZ2Fhcy5jb20vaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJOaXJhai5MYW1hIiwiaHR0cDovL3NjaGVtYXMuYTFnYWFzLmNvbS9pZGVudGl0eS9jbGFpbXMvSXNFbWFpbFZlcmlmaWVkIjoiRmFsc2UiLCJodHRwOi8vc2NoZW1hcy5hMWdhYXMuY29tL2lkZW50aXR5L2NsYWltcy9Jc1Bob25lVmVyaWZpZWQiOiJGYWxzZSIsImh0dHA6Ly9zY2hlbWFzLmExZ2Fhcy5jb20vaWRlbnRpdHkvY2xhaW1zL2NvbXBhbnlOYW1lIjoiRGVtbyBDb21wYW55IDEiLCJodHRwOi8vc2NoZW1hcy5hMWdhYXMuY29tL2lkZW50aXR5L2NsYWltcy9pc09mZnNob3JlIjoiRmFsc2UiLCJodHRwOi8vc2NoZW1hcy5hMWdhYXMuY29tL2lkZW50aXR5L2NsYWltcy9vZmZzaG9yZUJyYW5jaElkIjoiIiwianRpIjoiRTkxODgzMEU1M0JDMkUxMkE0MTIyMUZERDQ2RTE2OTEiLCJzaWQiOiJDMjI0NjIxMTRFMEFEQzFBMkU0RDc2MzkxMzNBQzJDRCIsImlhdCI6MTcyMDY2ODQ1MSwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsImVtYWlsIiwiam9iYm9va2luZ2FwaSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwd2QiXX0.MFV7FrO7UQze40ur6GVExUtxj7g9wL7htp1xymTr0InkhJ2d26OjvIC4yjBcZBUPqPQlsH9PeitiTvFJN-p_FnMruIsESCVc-34BiQgf7F9a5anGkHIIGGnfBMRnU58hXkrhQvSpVvS8trS3rpq27RcNz9TJLFtMYJzEF6zSXpgB7o5eI0u3Xo75c76wmyek4CINmS0WgyHNNWCk87uiTcZZZVvktpQ2LxtOrEdY4oxyjb5cbrE2K28VDuwdeC83muG4MaQD7w9JYJoRq5aNX7M3fPX4nMQ8VYs_TLIsrZ3UtBiTyzCb8Zqp2FKJWfRk9M-d7rBAuF_O8OnX9zK3zA";
        // const accessToken =
        const idToken = response.data.id_token;

        // Save tokens to localStorage or state management
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("id_token", idToken);
        localStorage.setItem("token", accessToken);
        var token = jwtDecode(accessToken);
        localStorage.setItem(
          "userName",
          token["http://schemas.a1gaas.com/identity/claims/name"]
        );

        var roles =
          token["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        //if admins then true
        if (
          roles.includes("Admin") ||
          roles.includes("System Admin") ||
          roles.includes("Super Admin")
        ) {
          localStorage.setItem("role", true);
        } else {
          localStorage.setItem("role", false);
        }
        navigate("/videos", { replace: true });
      })
      .catch((error) => {
        setLoading(false);
        console.error(
          "Error fetching token:",
          error.response ? error.response.data : error.message
        );
      });
  };

  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Please wait ...</p>
    </div>
  );
};

export default Loading;

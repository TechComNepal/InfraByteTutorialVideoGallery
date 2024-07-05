import React, { useEffect, useState } from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import logo from "../Assets/images/nonon.png";
import { redirect, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../services/auth";
import UserDropdown from "./UserDropdown";
// import { useAuth } from "oidc-react";
import { jwtDecode } from "jwt-decode";
import { getAuthorizationUrl, getTokenUrl, oidcConfig } from "../config/config";
import axios from "axios";
// import * as jwt_decode from "jwt-decode";

function Header() {
  let navigate = useNavigate();

  // const auth = useAuth();

  const [username, setUsername] = useState("Username");
  const token = localStorage.getItem("token");

  const handleLogout = async () => {
    // auth.signOut();
    // window.location.href = `${getAuthorizationUrl}?client_id=${oidcConfig.clientId}&redirect_uri=${oidcConfig.redirectUri}&response_type=${oidcConfig.response_type}&scope=${oidcConfig.scope}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
    const idTokenFound = localStorage.getItem("id_token");
    if (idTokenFound) {
      localStorage.removeItem("token");
      window.location.href = `${oidcConfig.authority}/connect/endsession?id_token=${idTokenFound}&post_logout_redirect_uri=${oidcConfig.postLogoutRedirectUri}`;
    } else {
      window.location.href = oidcConfig.postLogoutRedirectUri;
    }
    // navigate("/", { replace: true });

    // window.location.href = "/";
  };

  const getUserName = () => {
    const userName = localStorage.getItem("userName");
    if (userName != null) {
      setUsername(userName);
    } else {
    }
  };

  useEffect(() => {
    // const item = sessionStorage.getItem(
    //   `oidc.user:${oidcConfig.authority}:react_tutorial_client`
    // );
    // console.warn(JSON.parse(item));
    // console.log(JSON.parse(item)["access_token"]);
    const item = localStorage.getItem("access_token");
    getUserName();
    if (item != null) {
      // var token = jwtDecode(JSON.parse(item)["access_token"]);
      var token = jwtDecode(item);
      // localStorage.setItem("token", JSON.parse(item)["access_token"]);

      // console.info(JSON.stringify(item["access_token"]));
      // const userName= localStorage.setItem("userName",token["http://schemas.a1gaas.com/identity/claims/name"])

      // setUsername(token["http://schemas.a1gaas.com/identity/claims/name"]);
      // var roles =
      //   token["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      // if (
      //   roles.includes("Admin") ||
      //   roles.includes("System Admin") ||
      //   roles.includes("Super Admin")
      // ) {
      //   localStorage.setItem("role", true);
      // }else{
      //   localStorage.setItem("role", false);
      // }
      // setTokenUser(item);
      // getUserName();
    } else {
      // navigate("/callback", { replace: true });
    }
  }, []);

  const setTokenUser = async (item) => {
    try {
      var payload = {
        grant_type: "authorization_code",
        code: localStorage.getItem("code") ?? "",
        code_verifier: generateCodeVerifier() ?? "",
        client_id: oidcConfig.clientId,
        scope: oidcConfig.scope,
        // redirect_uri: oidcConfig.redirectUri,
        // 'grant_type': 'refresh_token',
        // 'client_id': oidcConfig.clientId,
        // refresh_token: JSON.parse(item)["refresh_token"],
        client_secret: "65O(86zh{}`yFD~};&H>A(]}5:y<L|Lt^=RhHW",
      };

      // const params = new URLSearchParams();
      // params.append("grant_type", "authorization_code");
      // params.append("code", localStorage.getItem("code") ?? "");
      // params.append("client_id", oidcConfig.clientId);
      // params.append("code_verifier", generateCodeVerifier() ?? "");
      // params.append("scope", oidcConfig.scope);

      const response = await axios.post(getTokenUrl.toString(), payload, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      alert("token success", response.data);
    } catch (err) {
      alert("token Error ::" + err);
    }
  };
  function dec2hex(dec) {
    return ("0" + dec.toString(16)).substr(-2);
  }

  function generateCodeVerifier() {
    var array = new Uint32Array(50 / 2);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec2hex).join("");
  }

  return (
    <div className="nav-bottom">
      <Navbar bg="white" variant="#201f41" className="container" expand="lg">
        <Navbar.Brand href="/videos">
          <img src={logo} alt="logo" width="100" hight="100" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* <Nav className="mx-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/">Dasboard</Nav.Link>
            <Nav.Link href="/videos">
              courses
            </Nav.Link>
          </Nav> */}
          <Form className="d-flex justify-content-end w-100 mt-2 mb-2">
            <Form.Control
              type="text"
              placeholder="Search infrabyte videos . . . "
              className="search-container"
            />
            <Button variant=" mx-2 button-container">Search</Button>
          </Form>
          {/* <a
        
        onClick={() => {
          navigate("/add/video");
         
        }}
      >
        Upload a video
      </a> */}
          <UserDropdown username={username} onLogout={handleLogout} />
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
export default Header;

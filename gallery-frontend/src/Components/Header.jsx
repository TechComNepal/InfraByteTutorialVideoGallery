import React, { useEffect, useState } from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import logo from "../Assets/images/nonon.png";
import { redirect, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../services/auth";
import UserDropdown from "./UserDropdown";
import { useAuth } from "oidc-react";
import { jwtDecode } from "jwt-decode";
import { oidcConfig } from "../config/config";
// import * as jwt_decode from "jwt-decode";

function Header() {
  let navigate = useNavigate();

  const auth = useAuth();

  const [username, setUsername] = useState("Username");
  const token = localStorage.getItem("token");

  var link = `https://localhost:5020/connect/endsession?id_token=${token}&post_logout_redirect_uri=http://localhost:3000`;

  const handleLogout = async () => {
    localStorage.removeItem("token");

    // var res = await  auth
    // .signOut()
    //   .then(() => {})
    //   .catch((error) => {
    //     console.error("Error during signout:", error);
    //   });
    auth.signOut();
    navigate("/", { replace: true });

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
    const item = sessionStorage.getItem(
      `oidc.user:${oidcConfig.authority}:react_tutorial_client`
    );
    // console.warn(JSON.parse(item));
    // console.log(JSON.parse(item)["access_token"]);

    if (item != null) {
      var token = jwtDecode(JSON.parse(item)["access_token"]);
      // console.info(JSON.stringify(item["access_token"]));
      setUsername(token["http://schemas.a1gaas.com/identity/claims/name"]);
      // const userName= localStorage.setItem("userName",token["http://schemas.a1gaas.com/identity/claims/name"])
      getUserName();
    }
  }, []);

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

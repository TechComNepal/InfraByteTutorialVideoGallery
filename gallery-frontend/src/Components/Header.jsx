import React from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import logo from "../Assets/images/nonon.png";
import { redirect, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../services/auth";

function Header() {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
  
    navigate("/");
    // redirect("/");
  };

  return (
    <div className="nav-bottom">
      <Navbar bg="white" variant="#201f41" className="container" expand="lg">
        <Navbar.Brand href="#">
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
          <Button
            variant="btn btn-outline-secondary mx-2 p-2"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
export default Header;

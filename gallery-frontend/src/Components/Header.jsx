import React from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";

function Header() {
  return (
    <div className="nav-bottom" >
      <Navbar bg="white" variant="#201f41" className="container" expand="lg">
        <Navbar.Brand href="#home">
          <img src="nonon.png" alt="logo" width="100" hight="100" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="">Home</Nav.Link>
            <Nav.Link href="https://infrabyte.com.au/tutorial/dashboard/">
              dashboard
            </Nav.Link>
            <Nav.Link href="https://infrabyte.com.au/tutorial/courses/">
              courses
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="text"
              placeholder="Search"
              className="me-sm-2"
            />
            <Button variant=" btn btn-outline-warning">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
export default Header;

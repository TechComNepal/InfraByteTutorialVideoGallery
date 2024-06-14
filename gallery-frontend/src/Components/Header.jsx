import React from 'react'
import {Navbar, Nav, Form, Button} from 'react-bootstrap'

function Header() {
  return (
    <Navbar bg="warning" variant="#201f41" styy>
        <Navbar.Brand href="#home" >
        <img src="nonon.png" alt="logo" width="100" hight="100" />
        </Navbar.Brand>
        <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <Nav.Link href="./signin">Sign In</Nav.Link>
            <Nav.Link href ="./login">login</Nav.Link>
        </Nav>
        <Form inline>
            <Form.Control type="text" placeholder="Search" className="me-sm-2" />
            <Button variant="outline-info">Search</Button>
        </Form>
    </Navbar>
  )
}
export default Header
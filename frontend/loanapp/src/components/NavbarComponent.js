import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';

function NavbarComponent({ user, setUser, logoutUser }) {
  return (
    <div>
      <Navbar bg="light" expand="lg" className="Nav" >
        <Navbar.Brand href="/" className="Brand">Loan App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {!(user != null && user.length > 0) && <Nav.Link href="/register">Register</Nav.Link>}
            {!(user != null && user.length > 0) && <Nav.Link href="/login">Login</Nav.Link>}
            {user != null && user.length > 0 && <Nav.Link onClick={() => logoutUser()}>Logout</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default NavbarComponent
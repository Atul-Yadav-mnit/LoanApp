import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';

function NavbarComponentAdmin({ logoutUser }) {
  return (
    <div className='position-fixed w-100'>
      <Navbar bg="light" expand="lg" className="Nav" >
        <Navbar.Brand href="/" className="Brand">LAMA</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/admin/dashboard">Home</Nav.Link>
            <Nav.Link onClick={() => logoutUser()}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default NavbarComponentAdmin

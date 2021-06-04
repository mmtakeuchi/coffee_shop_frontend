import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    return (
      <>
        <Navbar bg="white" variant="light" expand="md">
          <Navbar.Brand href="/">Coffee Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/products">Shop</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/cart">Cart</Nav.Link>
              {this.props.loggedIn ? (
                <Button onClick={this.logoutUser}>Logout</Button>
              ) : (
                <React.Fragment>
                  <Nav.Link href="/register">Register</Nav.Link>
                  <Nav.Link href="/login">Login</Nav.Link>
                </React.Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default NavBar;

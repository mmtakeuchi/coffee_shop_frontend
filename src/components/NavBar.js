import React from "react";
// import ShoppingCart from "./shopping-cart.svg";
import ShoppingCart from "../icons/cart3.svg";
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
              {this.props.loggedIn ? (
                <Button onClick={this.logoutUser}>Logout</Button>
              ) : (
                <React.Fragment>
                  <Nav.Link href="/register">Register</Nav.Link>
                  <Nav.Link href="/login">Login</Nav.Link>
                </React.Fragment>
              )}
              <Nav.Link href="/cart">
                {/* <img
                  src={process.env.PUBLIC_URL + "/images/shopping-cart.svg"}
                  alt="shopping cart icon"
                /> */}
                <img src={ShoppingCart} alt="shopping cart" />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default NavBar;

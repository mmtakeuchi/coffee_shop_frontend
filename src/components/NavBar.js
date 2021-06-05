import React from "react";
import { connect } from "react-redux";
import { logout } from "../actions/sessionActions";
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
    console.log(this.props);
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
              {this.props.user.isAuthenticated ? (
                <Nav.Link onClick={this.logoutUser}>Logout</Nav.Link>
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

const mapStateToProps = (state) => ({
  user: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

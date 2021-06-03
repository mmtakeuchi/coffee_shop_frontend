import React from "react";
import { Link } from "react-router-dom";

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
      <div className="Navbar">
        <h1>Cofffe Shop</h1>
        <Link to="/">Home</Link>
        {this.props.loggedIn ? (
          <button onClick={this.logoutUser}>Logout</button>
        ) : (
          <React.Fragment>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default NavBar;

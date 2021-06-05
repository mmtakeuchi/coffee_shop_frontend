import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login } from "../actions/sessionActions";
import { useFormik } from "formik";
import { Form, Button, Col } from "react-bootstrap";

export const Login = (props) => {
  const [values, setValues] = useState({ email: "", password: "", errors: {} });
  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: values.email,
      password: values.password,
    };
    console.log(user);
    props.login(user);
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Login Form</h2>
      <div
        style={{
          border: "1px solid black",
          width: "70%",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          padding: "2rem",
        }}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Row className="justify-content-center">
            <Col sm={12}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={values.email}
                  onChange={handleInputChange}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Row className="justify-content-center">
            <Col sm={12}>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Form.Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  errors: state.session.errors,
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

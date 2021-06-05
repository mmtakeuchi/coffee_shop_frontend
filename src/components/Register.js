import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { signup } from "../actions/sessionActions";
import { Formik } from "formik";
import { Form, Col, Button } from "react-bootstrap";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Names must have at least 2 characters")
    .max(30, "Names can't be longer than 30 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Must be a valid email address")
    .max(100, "Email must be less than 100 characters")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Names must have at least 6 characters")
    .max(30, "Names can't be longer than 30 characters")
    .required("Password is required"),
  password2: Yup.string()
    .required("Password confirmation is required")
    .oneOf([Yup.ref("password"), null], "Passwords don't match."),
});

const Register = (props) => {
  console.log(props);
  const renderErrors = () => {
    return (
      <ul>
        {props.errors.map((error, i) => (
          <li key={`error-${i}`}>{error}</li>
        ))}
      </ul>
    );
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        password2: "",
        signup: props.signup,
      }}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        // When button submits form and form is in the process of submitting, submit button is disabled
        // setSubmitting(true);
        const user = {
          name: values.name,
          email: values.email,
          password: values.password,
          password2: values.password2,
        };
        console.log(this);
        console.log(values);
        values.signup(user).then(() => {
          resetForm();
          setSubmitting(false);
        });
        // Simulate submitting to database, shows us values submitted, resets form
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   resetForm();
        //   setSubmitting(false);
        // }, 500);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
      }) => (
        <>
          <Form onSubmit={handleSubmit.bind(props)} className="mx-auto">
            <Form.Group controlId="formName">
              <Form.Label>Name :</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className={
                  touched.name && errors.name
                    ? "form-control is-invalid"
                    : "form-control"
                }
                isValid={touched.name && !errors.name}
              />

              {touched.name && errors.name ? (
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              ) : (
                <Form.Control.Feedback>Looks Good</Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email :</Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className={
                  touched.email && errors.email
                    ? "form-control is-invalid"
                    : "form-control"
                }
                isValid={touched.email && !errors.email}
              />
              {touched.email && errors.email ? (
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              ) : (
                <Form.Control.Feedback>Looks Good</Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="text"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className={
                  touched.password && errors.password
                    ? "form-control is-invalid"
                    : "form-control"
                }
                isValid={touched.password && !errors.password}
              />
              {touched.password && errors.password ? (
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              ) : (
                <Form.Control.Feedback>Looks Good</Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group controlId="formPassword2">
              <Form.Label>Password Confirmation:</Form.Label>
              <Form.Control
                type="text"
                name="password2"
                placeholder="Password Confirmation"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password2}
                className={
                  touched.password2 && errors.password2
                    ? "form-control is-invalid"
                    : "form-control"
                }
                isValid={touched.password2 && !errors.password2}
              />
              {touched.password2 && errors.password2 ? (
                <Form.Control.Feedback type="invalid">
                  {errors.password2}
                </Form.Control.Feedback>
              ) : (
                <Form.Control.Feedback>Looks Good</Form.Control.Feedback>
              )}
            </Form.Group>

            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
          {renderErrors()}
        </>
      )}
    </Formik>
  );
};

const mapStateToProps = (state) => ({
  errors: state.session.errors,
});

const mapDispatchToProps = (dispatch) => ({
  signup: (user) => dispatch(signup(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

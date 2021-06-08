import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signup } from "../../actions/sessionActions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

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

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Names must have at least 2 characters")
      .max(30, "Names can't be longer than 30 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Must be a valid email address")
      .max(100, "Email must be less than 100 characters")
      .required("Email is required"),
    password: Yup.string()
      .min(5, "Names must have at least 5 characters")
      .max(30, "Names can't be longer than 30 characters")
      .required("Password is required"),
    password2: Yup.string()
      .required("Password confirmation is required")
      .oneOf([Yup.ref("password"), null], "Passwords don't match."),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  console.log(formState);

  function onSubmit(values) {
    props.signup(values);
    return false;
  }

  return (
    <div className="card m-3" style={{ border: "1px solid black" }}>
      <h5 className="card-header">Register Form</h5>
      <div className="card-body" style={{ border: "1px solid black" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group col">
            <label>Name</label>
            <input
              name="name"
              type="text"
              {...register("name")}
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.name?.message}</div>
          </div>

          <div className="form-group col">
            <label>Email</label>
            <input
              name="email"
              type="text"
              {...register("email")}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>

          <div className="form-group col">
            <label>Password</label>
            <input
              name="password"
              type="password"
              {...register("password")}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>

          <div className="form-group col">
            <label>Confirm Password</label>
            <input
              name="password2"
              type="password"
              {...register("password2")}
              className={`form-control ${errors.password2 ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.password2?.message}</div>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary mr-1">
              Register
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="btn btn-secondary"
            >
              Reset
            </button>
          </div>
          <div>
            Already have an account? <Link to="/login">Sign In</Link>{" "}
          </div>
          {renderErrors()}
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  errors: state.session.errors,
});

const mapDispatchToProps = (dispatch) => ({
  signup: (user) => dispatch(signup(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

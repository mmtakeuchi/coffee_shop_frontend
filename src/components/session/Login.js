import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../actions/sessionActions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const Login = (props) => {
  console.log(props);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email address")
      .max(100, "Email must be less than 100 characters")
      .required("Email is required"),
    password: Yup.string()
      .min(5, "Names must have at least 5 characters")
      .max(30, "Names can't be longer than 30 characters")
      .required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(values) {
    props.login(values);
    return false;
  }

  return (
    <div className="card m-3" style={{ border: "1px solid black" }}>
      <h5 className="card-header">Login Form</h5>
      <div className="card-body" style={{ border: "1px solid black" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <div className="form-group">
            <button type="submit" className="btn btn-primary mr-1">
              Login
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
            Don't have an account? <Link to="/register">Sign Up</Link>
          </div>
        </form>
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

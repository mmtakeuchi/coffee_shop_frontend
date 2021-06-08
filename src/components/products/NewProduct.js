import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct } from "../../actions/productActions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from "cloudinary-react";

const NewProduct = (props) => {
  console.log(props);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .max(100, "Title must be less than 100 characters")
      .required("Title is required"),
    flavor: Yup.string().required("Flavor is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.string(),
    category: Yup.string().required("Category is required"),
    price: Yup.integer().required("Price is required"),
    stock: Yup.number().required("Stock is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(values) {
    props.addProduct(values);
    return false;
  }

  return (
    <div>
      <div className="card m-3" style={{ border: "1px solid black" }}>
        <h5 className="card-header">New Product</h5>
        <div className="card-body" style={{ border: "1px solid black" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group col">
              <label>Title</label>
              <input
                name="title"
                type="text"
                {...register("title")}
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.title?.message}</div>
            </div>

            <div className="form-group col">
              <label>Password</label>
              <input
                name="password"
                type="password"
                {...register("password")}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  errors: state.products.errors,
});

const mapDispatchToProps = (dispatch) => ({
  addProduct: (product) => dispatch(addProduct(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);

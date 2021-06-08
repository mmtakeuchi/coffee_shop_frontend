import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions/productActions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { CloudinaryContext } from "cloudinary-react";

const NewProduct = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const productErrors = useSelector((state) => state.products.errors);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .max(100, "Title must be less than 100 characters")
      .required("Title is required"),
    flavor: Yup.string().required("Flavor is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    price: Yup.number()
      .positive("Stock must be a positive number.")
      .required("Price is required"),
    stock: Yup.number()
      .positive("Stock must be a positive number.")
      .required("Stock is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(values) {
    console.log(values);
    dispatch(addProduct(values));
    return false;
  }

  return (
    <React.Fragment>
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
                <label>Flavor</label>
                <input
                  name="flavor"
                  type="text"
                  {...register("flavor")}
                  className={`form-control ${
                    errors.flavor ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">{errors.flavor?.message}</div>
              </div>

              <div className="form-group col">
                <label>Description</label>
                <textarea
                  name="description"
                  type="text"
                  {...register("description")}
                  className={`form-control ${
                    errors.description ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.description?.message}
                </div>
              </div>

              <div className="form-group col">
                <label>Category</label>
                <input
                  name="category"
                  type="text"
                  {...register("category")}
                  className={`form-control ${
                    errors.category ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.category?.message}
                </div>
              </div>

              <div className="form-group col">
                <label>Price</label>
                <input
                  name="price"
                  type="text"
                  {...register("price")}
                  className={`form-control ${errors.price ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.price?.message}</div>
              </div>

              <div className="form-group col">
                <label>Stock</label>
                <input
                  name="stock"
                  type="text"
                  {...register("stock")}
                  className={`form-control ${errors.stock ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.stock?.message}</div>
              </div>

              {/* <div className="form-group col">
                <label>Images</label>
                <input
                  name="images"
                  type="file"
                  {...register("images")}
                  className={`form-control ${
                    errors.images ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">{errors.images?.message}</div>
              </div> */}

              <div className="form-group">
                <button type="submit" className="btn btn-primary mr-1">
                  Add Product
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
    </React.Fragment>
  );
};

export default NewProduct;

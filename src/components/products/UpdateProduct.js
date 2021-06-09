import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getProduct } from "../../actions/productActions";
import { updateProduct } from "../../actions/productActions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { CloudinaryContext } from "cloudinary-react";

const UpdateProduct = (props) => {
  const productId = props.match.params.id;
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.products);
  const user = useSelector((state) => state.session.user);
  useEffect(() => dispatch(getProduct(productId)), [dispatch]);
  console.log(product, user);
  console.log(props);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .max(100, "Title must be less than 100 characters")
      .required("Title is required"),
    flavor: Yup.string().required("Flavor is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    price: Yup.number().required("Price is required"),
    stock: Yup.number()
      .positive("Stock must be a positive number.")
      .required("Stock is required"),
    images: Yup.mixed(),
  });
  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: product ? product : "",
  };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, setValue, formState } =
    useForm(formOptions);
  const { errors } = formState;

  setValue("title", product ? product.title : "");
  setValue("flavor", product ? product.flavor : "");
  setValue("description", product ? product.description : "");
  setValue("category", product ? product.category : "");
  setValue("price", product ? product.price : "");
  setValue("stock", product ? product.stock : "");
  setValue("images", product ? product.image : "");

  function onSubmit(values) {
    console.log(values);
    props.updateProduct(productId, values);
    return false;
  }

  return (
    <React.Fragment>
      {!user.isAdmin && <Redirect push to={`/products/${productId}`} />}
      {user.isAdmin && (
        <div>
          <div className="card m-3" style={{ border: "1px solid black" }}>
            <h5 className="card-header">Update Product</h5>
            <div className="card-body" style={{ border: "1px solid black" }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group col">
                  <label>Title</label>
                  <input
                    name="title"
                    type="text"
                    {...register("title")}
                    className={`form-control ${
                      errors.title ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.title?.message}
                  </div>
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
                  <div className="invalid-feedback">
                    {errors.flavor?.message}
                  </div>
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
                    className={`form-control ${
                      errors.price ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.price?.message}
                  </div>
                </div>

                <div className="form-group col">
                  <label>Stock</label>
                  <input
                    name="stock"
                    type="text"
                    {...register("stock")}
                    className={`form-control ${
                      errors.stock ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.stock?.message}
                  </div>
                </div>

                <div className="form-group col">
                  <label>Images</label>
                  <input
                    name="images"
                    type="file"
                    {...register("images")}
                    className={`form-control ${
                      errors.images ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.images?.message}
                  </div>
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary mr-1">
                    Update Product
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
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  errors: state.products.errors,
});

const mapDispatchToProps = (dispatch) => ({
  updateProduct: (product) => dispatch(updateProduct(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct);

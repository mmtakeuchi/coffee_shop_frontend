import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions/productActions";
import { uploadImage, uploadPhoto } from "../../actions/imageActions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { CloudinaryContext } from "cloudinary-react";
import config from "../../config/config";
import { Form, Col, Button } from "react-bootstrap";

const NewProduct = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [preview, setPreview] = useState("");
  const user = useSelector((state) => state.session.user);
  const productErrors = useSelector((state) => state.products.errors);
  console.log(photo);

  // const validationSchema = Yup.object().shape({
  //   title: Yup.string()
  //     .max(100, "Title must be less than 100 characters")
  //     .required("Title is required"),
  //   flavor: Yup.string().required("Flavor is required"),
  //   description: Yup.string().required("Description is required"),
  //   category: Yup.string().required("Category is required"),
  //   price: Yup.number()
  //     .positive("Stock must be a positive number.")
  //     .required("Price is required"),
  //   stock: Yup.number()
  //     .positive("Stock must be a positive number.")
  //     .required("Stock is required"),
  //   images: Yup.mixed(),
  // });
  // const formOptions = { resolver: yupResolver(validationSchema) };

  // // get functions to build form with useForm() hook
  // const { register, handleSubmit, reset, formState } = useForm(formOptions);
  // const { errors } = formState;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  const handleSubmit = (e) => {
    console.log("submit");

    e.preventDefault();
    if (!preview) return;
    uploadPhoto(preview);
    // dispatch(addProduct(values));
  };

  const uploadPhoto = async (EncodedImage) => {
    const data = { data: `${EncodedImage}` };
    try {
      await axios({
        method: "post",
        url: "/api/image",
        data: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        console.log(res);
        setPhoto(res.data.image);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="1234 Main St" />
        </Form.Group>

        <Form.Group controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control placeholder="Apartment, studio, or floor" />
        </Form.Group>

        <Form.Group>
          <label>Images</label>
          <input
            type="file"
            id="exampleFormControlFile1"
            label="Example file input"
            name="image"
            value={selectedFile}
            onChange={handleImageUpload}
            className="form-input"
          />
          {/* <Form.File
            id="exampleFormControlFile1"
            label="Example file input"
            name="image"
            value={photo}
            onChange={handleImageUpload}
            className="form-input"
          /> */}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {preview && <img src={preview} alt="photo" style={{ height: "300px" }} />}
      {/* <div>
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

              <div className="form-group col">
                <label>Images</label>
                <input
                  name="images"
                  type="file"
                  {...register("images")}
                  onChange={handleImageUpload}
                  className={`form-control ${
                    errors.images ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">{errors.images?.message}</div>
              </div>

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
      </div> */}
    </React.Fragment>
  );
};

export default NewProduct;

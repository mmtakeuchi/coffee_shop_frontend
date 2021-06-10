import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions/productActions";
import { uploadImage } from "../../actions/imageActions";
import { Form, Col, Button } from "react-bootstrap";

const NewProduct = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    title: "",
    flavor: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    image: "",
  });
  const [photograph, setPhoto] = useState("photo");
  const [selectedFile, setSelectedFile] = useState("");
  const [preview, setPreview] = useState("");
  const user = useSelector((state) => state.session.user);
  const productErrors = useSelector((state) => state.products.errors);
  const photo = useSelector((state) => state.image);

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    if (!preview) return;
    uploadPhoto(preview);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    console.log(preview);
    dispatch(addProduct(values));
  };

  const uploadPhoto = async (EncodedImage) => {
    const data = { data: `${EncodedImage}` };
    try {
      await axios({
        method: "post",
        url: "/api/image",
        data: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    } catch (err) {
      console.log(err);
    }
    const photo = dispatch(uploadImage(data));

    console.log(photo);
  };

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group controlId="formGridTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            type="text"
            placeholder="Enter Product Name"
            value={values.title}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formGridFlavor">
          <Form.Label>Flavor</Form.Label>
          <Form.Control
            name="flavor"
            type="text"
            placeholder="Enter Product Flavor"
            value={values.flavor}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formGridDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            type="text"
            placeholder="Enter Product Description"
            value={values.description}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formGridACategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            name="category"
            type="text"
            placeholder="Enter Product Category"
            value={values.category}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formGridPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            type="text"
            placeholder="Enter Product Price"
            value={values.price}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formGridAStock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            name="stock"
            type="text"
            placeholder="Enter Product Stock"
            value={values.stock}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.File id="formcheck-api-regular">
          <Form.File.Label>Image</Form.File.Label>
          <Form.File.Input
            id="exampleFormControlFile1"
            name="image"
            value={values.image}
            onChange={handleImageUpload}
            className="form-input"
          />
        </Form.File>
        {/* <Form.Group>
          <label>Images</label>
          <input
            type="file"
            id="exampleFormControlFile1"
            name="image"
            value={photo}
            onChange={handleImageUpload}
            className="form-input"
          /> */}
        {/* <Form.File
            id="exampleFormControlFile1"
            label="Example file input"
            name="image"
            value={photo}
            onChange={handleImageUpload}
            className="form-input"
          /> */}
        {/* </Form.Group> */}

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

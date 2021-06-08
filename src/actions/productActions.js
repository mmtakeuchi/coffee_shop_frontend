import axios from "axios";
import { returnErrors } from "./errorActions";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT = "GET_PRODUCT";
export const RECEIVE_PRODUCT_ERRORS = "RECEIVE_PRODUCT_ERRORS";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const getItems = (products) => ({
  type: GET_PRODUCTS,
  products,
});

export const getItem = (product) => ({
  type: GET_PRODUCT,
  product,
});

export const createProduct = (newProduct) => ({
  type: ADD_PRODUCT,
  newProduct,
});

export const updateItem = (updatedProduct) => ({
  type: UPDATE_PRODUCT,
  updatedProduct,
});

export const deleteItem = (product) => ({
  type: DELETE_PRODUCT,
  product,
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_PRODUCT_ERRORS,
  errors,
});

export const getProducts = () => (dispatch) => {
  axios
    .get("/api/products")
    .then((res) => {
      console.log(res);
      dispatch(getItems(res.data));
    })
    .catch((err) => {
      dispatch(receiveErrors(err.response.data, err.response.status));
    });
};

export const addProduct = (newProduct) => (dispatch) => {
  axios
    .post("/api/products", newProduct)
    .then((res) => {
      console.log(res);
      //   dispatch(createProduct(res.data));
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getProduct = (productId) => (dispatch) => {
  axios
    .get(`/api/products/${productId}`)
    .then((res) => {
      console.log(res);
      dispatch(getItem(res.data));
    })
    .catch((err) =>
      dispatch(receiveErrors(err.response.data, err.response.status))
    );
};

export const updateProduct = (productId, updatedProduct) => (dispatch) => {
  axios
    .put(`/api/products/${productId}`, updatedProduct)
    .then((res) => {
      console.log(res);
      dispatch(updateItem(res.data));
    })
    .catch((err) => dispatch(returnErrors(err.response.data)));
};

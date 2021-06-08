import axios from "axios";
import { returnErrors } from "./errorActions";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const RECEIVE_PRODUCT_ERRORS = "RECEIVE_PRODUCT_ERRORS";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const getItems = (products) => ({
  type: GET_PRODUCTS,
  products,
});

export const addItem = (newProduct) => ({
  type: ADD_PRODUCT,
  newProduct,
});

export const updateItem = (product) => ({
  type: UPDATE_PRODUCT,
  product,
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
      dispatch(receiveErrors(err.response.data));
    });
};

export const addProduct = (product) => (dispatch) => {
  axios
    .post("/api/products", product)
    .then((res) =>
      dispatch({
        type: ADD_PRODUCT,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

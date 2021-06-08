import axios from "axios";
import { returnErrors } from "./errorActions";
export const GET_CART = "GET_CART";
export const ADD_TO_CART = "ADD_TO_CART";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const RECEIVE_PRODUCT_ERRORS = "RECEIVE_PRODUCT_ERRORS";

export const getCartItems = (cart) => ({
  type: GET_CART,
  cart,
});

export const addCartItem = (cart) => ({
  type: ADD_TO_CART,
  cart,
});

export const deleteCartItem = (cart) => ({
  type: DELETE_FROM_CART,
  cart,
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_PRODUCT_ERRORS,
  errors,
});

export const getCart = (userId) => (dispatch) => {
  axios
    .get(`/api/cart/${userId}`)
    .then((res) => {
      console.log(res);
      dispatch(getCartItems(res.data));
    })
    .catch((err) =>
      dispatch(receiveErrors(err.response.data, err.response.status))
    );
};

export const addToCart = (userId, productId, quantity) => (dispatch) => {
  axios
    .post(`/api/cart/${userId}`, { productId, quantity })
    .then((res) => {
      console.log(res);
      dispatch(addCartItem(res.data));
    })
    .catch((err) =>
      dispatch(receiveErrors(err.response.data, err.response.status))
    );
};

export const deleteFromCart = (userId, productId) => (dispatch) => {
  axios
    .delete(`/api/cart/${userId}/${productId}`)
    .then((res) => {
      dispatch(deleteCartItem(res.data));
    })
    .catch((err) =>
      dispatch(receiveErrors(err.response.data, err.response.status))
    );
};

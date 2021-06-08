import {
  GET_CART,
  ADD_TO_CART,
  DELETE_FROM_CART,
  RECEIVE_PRODUCT_ERRORS,
} from "../actions/cartActions";

const initialState = {
  cart: null,
  errors: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      console.log(action.cart);
      return {
        ...state,
        cart: action.cart,
      };
    case ADD_TO_CART:
      console.log(action.cart);
      return {
        ...state,
        cart: action.cart,
      };
    case DELETE_FROM_CART:
      return {
        ...state,
        cart: action.cart,
      };
    case RECEIVE_PRODUCT_ERRORS:
      return { errors: [action.errors] };
    default:
      return state;
  }
}

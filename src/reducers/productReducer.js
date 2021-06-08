import {
  GET_PRODUCTS,
  RECEIVE_PRODUCT_ERRORS,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../actions/productActions";

const initialState = {
  products: [],
  errors: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      console.log(action.products);
      return {
        ...state,
        products: action.products,
      };
    case RECEIVE_PRODUCT_ERRORS:
      return { errors: [action.errors] };
    default:
      return state;
  }
}

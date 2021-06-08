import {
  GET_PRODUCTS,
  GET_PRODUCT,
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
    case GET_PRODUCT:
      console.log(action.product);
      return {
        ...state,
        products: action.product,
      };
    case ADD_PRODUCT:
      console.log(action.newProduct);
      return {
        ...state,
        products: [...state.products, action.newProduct],
      };
    case UPDATE_PRODUCT:
      console.log(action.updatedProduct);
      console.log(state);
      let items = [...state.products].filter(
        (product) => product.id !== action.updatedProduct._id
      );
      return {
        ...state,
        products: items,
      };
    case RECEIVE_PRODUCT_ERRORS:
      return { errors: [action.errors] };
    default:
      return state;
  }
}

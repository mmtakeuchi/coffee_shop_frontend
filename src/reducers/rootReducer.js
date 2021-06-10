import { combineReducers } from "redux";
import sessionReducer from "./sessionReducer";
import productReducer from "./productReducer";
import imageReducer from "./imageReducer";

const rootReducer = combineReducers({
  session: sessionReducer,
  products: productReducer,
  image: imageReducer,
});

export default rootReducer;

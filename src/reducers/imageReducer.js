import { UPLOAD_IMAGE, RECEIVE_IMAGE_ERRORS } from "../actions/imageActions";
import { RECEIVE_SESSION_ERRORS } from "../actions/sessionActions";

const initialState = {
  image: [],
  errors: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPLOAD_IMAGE:
      console.log(action.image);
      return {
        ...state,
        image: action.image,
      };
    case RECEIVE_IMAGE_ERRORS:
      return {
        errors: action.errors,
      };
    default:
      return state;
  }
}

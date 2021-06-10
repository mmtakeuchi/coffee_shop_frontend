import { UPLOAD_IMAGE, RECEIVE_IMAGE_ERRORS } from "../actions/imageActions";

const initialState = {
  image: null,
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
    default:
      return {
        state,
      };
  }
}

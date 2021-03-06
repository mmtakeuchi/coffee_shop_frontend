import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_LOGOUT,
  RECEIVE_USER_SIGN_IN,
  RECEIVE_SESSION_ERRORS,
} from "../actions/sessionActions";

const initialState = {
  isAuthenticated: false,
  user: {},
  errors: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser,
      };
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined,
      };
    case RECEIVE_USER_SIGN_IN:
      return {
        ...state,
        isAuthenticated: !!action.newUser,
        user: action.newUser,
      };
    case RECEIVE_SESSION_ERRORS:
      return { errors: [action.errors] };
    default:
      return state;
  }
}

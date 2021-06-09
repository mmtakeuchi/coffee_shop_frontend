import axios from "axios";
import { returnErrors } from "./errorActions";
export const UPLOAD_IMAGE = "UPLOAD_IMAGE";
export const RECEIVE_IMAGE_ERRORS = "RECEIVE_IMAGE_ERRORS";

export const uploadPhoto = (image) => ({
  type: UPLOAD_IMAGE,
  image,
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_IMAGE_ERRORS,
  errors,
});

export const uploadImage = (photo) => (dispatch) => {
  axios
    .post("/api/image", photo, {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res);
      dispatch(uploadPhoto(res.data));
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

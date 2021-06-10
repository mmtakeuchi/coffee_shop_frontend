// import axios from "axios";
// import { returnErrors } from "./errorActions";
// export const UPLOAD_IMAGE = "UPLOAD_IMAGE";
// export const RECEIVE_IMAGE_ERRORS = "RECEIVE_IMAGE_ERRORS";

// export const uploadPhoto = (photo) => ({
//   type: UPLOAD_IMAGE,
//   photo,
// });

// export const receiveErrors = (errors) => ({
//   type: RECEIVE_IMAGE_ERRORS,
//   errors,
// });

// export const uploadImage = (photo) => (dispatch) => {
//   const data = { data: `${photo}` };
//   axios({
//     method: "post",
//     url: "/api/image",
//     data: JSON.stringify(data),
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((res) => {
//       console.log(res.data.image);
//       dispatch(uploadPhoto(res.data.image));
//     })
//     .catch((err) => {
//       console.log(err);
//       dispatch(receiveErrors(err.response.data));
//     });
// };

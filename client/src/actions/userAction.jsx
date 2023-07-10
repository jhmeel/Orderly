import {
  CLEAR_ERRORS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
} from "../constants/userConstants";
import axiosInstance from "../utils/axiosInstance";
import GetToken from "../utils/getToken";


// Login User
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });

    const { data } = await axiosInstance().post("/api/v1/login", { email, password });

    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: error.message,
    });
  }
};

// Register User
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const { data } = await axiosInstance().post("/api/v1/signup", userData);

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.message,
    });
  }
};

// Load User
export const loadUser = (token) => async (dispatch) => {

  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axiosInstance(token).get("/api/v1/profile");

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.message,
    });
  }
};

// Logout User
export const logoutUser = () => async (dispatch) => {
  try {
    await axiosInstance().get("/api/v1/logout");
    dispatch({ type: LOGOUT_USER_SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGOUT_USER_FAIL,
      payload: error.message,
    });
  }
};

// Get User Details
export const getUserDetails = (username, token) => async (dispatch) => {

  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axiosInstance(token).get(`/api/v1/user/${username}`);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

// Get User Details By ID
export const getUserDetailsById = (userId, token) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axiosInstance(token).get(`/api/v1/userdetails/${userId}`);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

// // Get Suggested Users
// export const getSuggestedUsers = () => async (dispatch) => {
//     try {

//         dispatch({ type: ALL_USERS_REQUEST });

//         setTimeout(async () => {
//             const { data } = await axiosInstance().get('/api/v1/users/suggested');

//             dispatch({
//                 type: ALL_USERS_SUCCESS,
//                 payload: data.users,
//             });
//         }, 600);

//     } catch (error) {
//         dispatch({
//             type: ALL_USERS_FAIL,
//             payload: error.message,
//         });
//     }
// };

// // Follow | Unfollow User
// export const followUser = (userId) => async (dispatch) => {
//     try {

//         dispatch({ type: FOLLOW_USER_REQUEST });
//         const { data } = await axiosInstance().get(`/api/v1/follow/${userId}`);

//         dispatch({
//             type: FOLLOW_USER_SUCCESS,
//             payload: data,
//         });

//     } catch (error) {
//         dispatch({
//             type: FOLLOW_USER_FAIL,
//             payload: error.message,
//         });
//     }
// };

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const { data } = await axiosInstance().post("/api/v1/password/forgot", { email });

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.message,
    });
  }
};

// Reset Password
export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const { data } = await axiosInstance().put(`/api/v1/password/reset/${token}`, {
      password,
    });

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.message,
    });
  }
};

// Update User Profile
export const updateProfile = (userData, token) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const { data } = await axiosInstance(token).put("/api/v1/update/profile", userData);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.message,
    });
  }
};

// Update User Password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const { data } = await axiosInstance().put("/api/v1/update/password", passwords);

    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.message,
    });
  }
};

// Clear All Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

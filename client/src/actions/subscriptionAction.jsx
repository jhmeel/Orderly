import axios from "axios";
import {
  CLEAR_ERRORS,
  NEW_SUBSCRIPTION_FAIL,
  NEW_SUBSCRIPTION_REQUEST,
  NEW_SUBSCRIPTION_SUCCESS,
  SUBSCRIPTION_DETAILS_FAIL,
  SUBSCRIPTION_DETAILS_REQUEST,
  SUBSCRIPTION_DETAILS_SUCCESS,
} from "../constants/subscriptionConstants";

// New subscription
export const newSubscription = (subscriptionData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_SUBSCRIPTION_REQUEST });
    const config = { header: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/v1/subscription/new",
      subscriptionData,
      config
    );

    dispatch({
      type: NEW_SUBSCRIPTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_SUBSCRIPTION_FAIL,
      payload: error.message,
    });
  }
};

// Get subscription Details
export const getSubscriptionDetails = (subscriptionId) => async (dispatch) => {
  try {
    dispatch({ type: SUBSCRIPTION_DETAILS_REQUEST });
    const { data } = await axios.get(
      `/api/v1/subscription/detail/${subscriptionId}`
    );

    dispatch({
      type: SUBSCRIPTION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUBSCRIPTION_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

// Clear All Errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

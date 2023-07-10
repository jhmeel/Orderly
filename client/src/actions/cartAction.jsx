import axios from "axios";
import {
  ADD_TO_CART,
  EMPTY_CART,
  REMOVE_FROM_CART,
} from "../constants/cartConstants";


export const addItemsToCart = (item) => (dispatch) => {
  dispatch({
    type: ADD_TO_CART,
    payload: {
      id: item._id,
      name: item.name,
      seller: item.brand,
      price: item.price,
      image: item.images[0].url,
      quantity,
    },
  });
};

export const removeItemFromCart = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: id,
  });
};

export const emptyCart = () => (dispatch) => {
  dispatch({ type: EMPTY_CART });
};

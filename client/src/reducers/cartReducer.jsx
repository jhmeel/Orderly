import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART,} from "../constants/cartConstants";
import { useSnackbar } from "notistack";

const initialState = {
    cartItems: []
  };
export const cartReducer = (state = initialState, action) => {
    const { enqueueSnackbar } = useSnackbar();
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const ItemExist = state.cartItems.find((it) => it.id === item.id);

            if (ItemExist) {
                enqueueSnackbar('Item already exist in the cart!', { variant: "warning" });
                return;
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((it) => it.id !== action.payload)
            }
        case EMPTY_CART:
            return {
                ...state,
                cartItems: [],
            }
        default:
            return state;
    }
}
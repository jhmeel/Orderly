import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "../constants/wishlistConstants";
import { useSnackbar } from "notistack";

export const wishlistReducer = (state = { wishlistItems: [] }, { type, payload }) => {
    const { enqueueSnackbar } = useSnackbar();
    switch (type) {

        case ADD_TO_WISHLIST:
            const item = payload;
            const itemExist = state.wishlistItems.find((i) => i.product === item.product);

            if (itemExist) {
                enqueueSnackbar('Item already exist in the list!', { variant: "warning" });
                return;
            } else {
                return {
                    ...state,
                    wishlistItems: [...state.wishlistItems, item],
                }
            }
        case REMOVE_FROM_WISHLIST:
            return {
                ...state,
                wishlistItems: state.wishlistItems.filter((i) => i.id !== payload)
            }
        default:
            return state;
    }
}
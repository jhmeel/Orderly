
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "../constants/wishlistConstants";


export const addToWishlist = (item) => {

    dispatch({
        type: ADD_TO_WISHLIST,
        payload: {
            id: item._id,
            name: item.name,
            price: item.price,
            image: item.images[0].url,
            ratings: item.ratings,
            reviews: item.numOfReviews,
            brand: item.brand,
        },
    });

}


export const removeFromWishlist = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_FROM_WISHLIST,
        payload: id,
    });
}
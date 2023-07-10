import { CLEAR_ERRORS,
    NEW_SUBSCRIPTION_FAIL, NEW_SUBSCRIPTION_REQUEST, NEW_SUBSCRIPTION_SUCCESS,NEW_SUBSCRIPTION_RESET, SUBSCRIPTION_DETAILS_RESET, SUBSCRIPTION_DETAILS_FAIL, SUBSCRIPTION_DETAILS_REQUEST, 
    SUBSCRIPTION_DETAILS_SUCCESS} from "../constants/subscriptionConstants";



export const newSubscriptionReducer = (state = { subscription: {} }, { type, payload }) => {
    switch (type) {
        case NEW_SUBSCRIPTION_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_SUBSCRIPTION_SUCCESS:
            return {
                loading: false,
                success: payload.success,
                subscription: payload.subscription,
            };
        case NEW_SUBSCRIPTION_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case NEW_SUBSCRIPTION_RESET:
            return {
                ...state,
                success: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}


export const subscriptionDetailsReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case SUBSCRIPTION_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SUBSCRIPTION_DETAILS_SUCCESS:
            return {
                loading: false,
                subscription: payload.subscription,
            };
        case SUBSCRIPTION_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case SUBSCRIPTION_DETAILS_RESET:
            return {
                loading: false,
                subscription: {}
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}
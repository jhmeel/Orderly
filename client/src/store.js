import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "reduxjs-toolkit-persist";
import localForage from "localforage";

import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";


import {
  newSubscriptionReducer,
  subscriptionDetailsReducer,
} from "./reducers/subscriptionReducer";


const reducer = combineReducers({
  //users
  user: userReducer,
  userDetails: userDetailsReducer,
  allUsers: allUsersReducer,
  forgotPassword: forgotPasswordReducer,
  profile: profileReducer,


  //subscription
  newSubscription: newSubscriptionReducer,
  subscriptionDetails: subscriptionDetailsReducer,
});

const persistConfig = {
  key: "root",
  storage: localForage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export let persistor = persistStore(store);











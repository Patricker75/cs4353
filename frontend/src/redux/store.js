// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import fuelQuoteSliceReducer from "./slices/fuelQuoteSlice";
import historyReducer from "./slices/historySlice";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";

const combinedReducer = combineReducers({
  fuelQuote: fuelQuoteSliceReducer,
  history: historyReducer,
  auth: authReducer,
  profile: profileReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "logout") {
    state = undefined;
  }

  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;

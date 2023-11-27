// store.js
import { configureStore } from "@reduxjs/toolkit";
import fuelQuoteSliceReducer from "./slices/fuelQuoteSlice";
import historyReducer from "./slices/historySlice"; // Import the history slice
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";

const rootReducer = {
  fuelQuote: fuelQuoteSliceReducer,
  history: historyReducer, // Include the history slice
  auth: authReducer,
  profile: profileReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;

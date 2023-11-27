// store.js
import { configureStore } from "@reduxjs/toolkit";
import fuelQuoteSliceReducer from "./slices/fuelQuoteSlice";
import clientProfileReducer from "./slices/clientProfileSlice";
import historyReducer from "./slices/historySlice"; // Import the history slice
import authReducer from "./slices/authSlice";

const rootReducer = {
  fuelQuote: fuelQuoteSliceReducer,
  clientProfile: clientProfileReducer,
  history: historyReducer, // Include the history slice
  auth: authReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

// Subscribe to the store and log the state whenever it changes
store.subscribe(() => {
  const state = store.getState();
  console.log("Redux Store State:", state);
});

export default store;

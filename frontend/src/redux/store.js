// store.js
import { configureStore } from "@reduxjs/toolkit";
import fuelQuoteSliceReducer from "./fuelQuoteSlice";
import clientProfileReducer from "./clientProfileSlice";
import loginReducer from "./loginSlice";
import registerReducer from "./registerSlice";
import historyReducer from "./historySlice"; // Import the history slice

const rootReducer = {
  fuelQuote: fuelQuoteSliceReducer,
  clientProfile: clientProfileReducer,
  register: registerReducer,
  login: loginReducer,
  history: historyReducer, // Include the history slice
};

const middleware = [];

const enhancers = [];

const store = configureStore({
  reducer: rootReducer,
  middleware,
  enhancers,
});

// Subscribe to the store and log the state whenever it changes
store.subscribe(() => {
  const state = store.getState();
  console.log("Redux Store State:", state);
});

export default store;

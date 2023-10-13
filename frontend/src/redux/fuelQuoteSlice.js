import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  amount: 1,
  unitPrice: 10,
  totalPrice: 0,
  fuelQuote: 0, // New fuelQuote variable
  deliveryDate: new Date().toISOString().split('T')[0],
};

const fuelQuoteSlice = createSlice({
  name: 'fuelQuote',
  initialState,
  reducers: {
    updateAmount: (state, action) => {
      state.amount = action.payload;
    },
    updateUnitPrice: (state, action) => {
      state.unitPrice = action.payload;
    },
    updateTotalPrice: (state) => {
      state.totalPrice = state.amount * state.unitPrice;
    },
    updateDeliveryDate: (state, action) => {
      state.deliveryDate = action.payload;
    },
    updateFuelQuote: (state, action) => {
      state.fuelQuote = action.payload;
    },
  },
});

export const {
  updateAmount,
  updateUnitPrice,
  updateTotalPrice,
  updateDeliveryDate,
  updateFuelQuote, // Export the new action
} = fuelQuoteSlice.actions;

export const fuelQuote = initialState.fuelQuote;

export default fuelQuoteSlice.reducer;
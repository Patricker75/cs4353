import { createSlice } from "@reduxjs/toolkit";

const initialMockData = [
  {
    amount: 3,
    unitPrice: 12.5,
    totalPrice: 37.5,
    deliveryDate: "2023-09-22T00:00:00.000Z",
    deliveryAddress: "123 Main Street, City, State",
  },
  {
    amount: 5,
    unitPrice: 11.75,
    totalPrice: 58.75,
    deliveryDate: "2023-09-23T00:00:00.000Z",
    deliveryAddress: "456 Elm Street, City, State",
  },
  {
    amount: 2,
    unitPrice: 10.0,
    totalPrice: 20.0,
    deliveryDate: "2023-09-24T00:00:00.000Z",
    deliveryAddress: "789 Oak Avenue, City, State",
  },
  {
    amount: 4,
    unitPrice: 12.0,
    totalPrice: 48.0,
    deliveryDate: "2023-09-25T00:00:00.000Z",
    deliveryAddress: "101 Pine Road, City, State",
  },
];

const historySlice = createSlice({
  name: "history",
  initialState: {
    fuelQuoteHistory: initialMockData,
  },
  reducers: {
    updateFuelQuoteHistory: (state, action) => {
      // Replace the existing data with the new data
      state.fuelQuoteHistory = action.payload;
    },
  },
});

export const { updateFuelQuoteHistory } = historySlice.actions;

export default historySlice.reducer;

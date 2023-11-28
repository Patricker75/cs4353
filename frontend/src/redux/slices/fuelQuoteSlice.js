import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getServerUrl } from "../../utils/consts";

const initialState = {
  quote: {
    amount: -1,
    unitPrice: -1,
    totalPrice: -1,
    deliveryAddress: "",
    deliveryDate: null,
  },
  error: "",
};

export const handlePriceGet = createAsyncThunk(
  "fuelQuote/get-price",
  async (amount, { getState }) => {
    let state = getState();

    let config = {
      headers: {
        userId: state.auth.userId,
      },
    };
    return axios
      .get(`${getServerUrl()}/api/pricing/${amount}`, config)
      .then((response) => response.data)
      .catch((error) => {
        throw Error(error.response.data.message);
      });
  }
);

export const handleQuoteAdd = createAsyncThunk(
  "fuelQuote/add-quote",
  async (quoteData, { getState }) => {
    let state = getState();

    let config = {
      headers: {
        userId: state.auth.userId,
      },
    };
    return axios
      .post(`${getServerUrl()}/api/quotes`, quoteData, config)
      .then((response) => response.data)
      .catch((error) => {
        throw Error(error.response.data.message);
      });
  }
);

const fuelQuoteSlice = createSlice({
  name: "fuelQuote",
  initialState,
  reducers: {},
});

export default fuelQuoteSlice.reducer;

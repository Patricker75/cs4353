import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getServerUrl } from "../../utils/consts";

const initialState = {
  items: [],
  error: "",
};

export const handleHistoryGet = createAsyncThunk(
  "history/get",
  async (_, { getState }) => {
    let state = getState();

    let config = {
      headers: {
        userId: state.auth.userId,
      },
    };
    return axios
      .get(`${getServerUrl()}/api/quotes`, config)
      .then((response) => response.data)
      .catch((error) => {
        throw Error(error.response.data.message);
      });
  }
);

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(handleHistoryGet.fulfilled, (state, action) => {
      state.items = action.payload.quotes.map((quote) => {
        return {
          ...quote,
          deliveryDate: new Date(quote.deliveryDate),
        };
      });
      state.error = "";
    });
    builder.addCase(handleHistoryGet.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default historySlice.reducer;

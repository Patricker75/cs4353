import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getServerUrl } from "../../utils/consts";

const initialState = {
  userId: -1,
  error: "",
};

export const handleRegisterUser = createAsyncThunk(
  "auth/register",
  async (userData) => {
    return axios
      .post(`${getServerUrl()}/api/login/register`, userData)
      .then((response) => response.data.id)
      .catch((error) => {
        throw Error(error.response.data.message);
      });
  }
);

export const handleLoginUser = createAsyncThunk(
  "auth/login",
  async (userData) => {
    return axios
      .post(`${getServerUrl()}/api/login`, userData)
      .then((response) => response.data.id)
      .catch((error) => {
        throw Error(error.response.data.message);
      });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(handleRegisterUser.pending, (state) => {
      state = initialState;
    });
    builder.addCase(handleRegisterUser.fulfilled, (state, action) => {
      console.log(action);
      state.userId = action.payload;
      state.error = "";
    });
    builder.addCase(handleRegisterUser.rejected, (state, action) => {
      state.userId = -1;
      state.error = action.error.message;
    });

    builder.addCase(handleLoginUser.pending, (state) => {
      state = initialState;
    });
    builder.addCase(handleLoginUser.fulfilled, (state, action) => {
      console.log(action);
      state.userId = action.payload;
      state.error = "";
    });
    builder.addCase(handleLoginUser.rejected, (state, action) => {
      state.userId = -1;
      state.error = action.error.message;
    });
  },
});

export default authSlice.reducer;

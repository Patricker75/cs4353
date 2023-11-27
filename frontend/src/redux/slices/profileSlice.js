import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getServerUrl } from "../../utils/consts";

const initialState = {
  profile: {
    name: "",
    addressPrimary: "",
    addressAux: "",
    city: "",
    state: "",
    zipCode: -1,
  },
  error: "",
};

export const handleProfileUpdate = createAsyncThunk(
  "profile/update",
  async (profileData, { getState }) => {
    let state = getState();

    let config = {
      headers: {
        userId: state.auth.userId,
      },
    };
    return axios
      .post(`${getServerUrl()}/api/profile`, profileData, config)
      .then(() => profileData)
      .catch((error) => {
        throw Error(error.response.data.message);
      });
  }
);

export const handleProfilGet = createAsyncThunk(
  "profile/get",
  async (_, { getState }) => {
    let state = getState();

    let config = {
      headers: {
        userId: state.auth.userId,
      },
    };
    return axios
      .get(`${getServerUrl()}/api/profile`, config)
      .then((response) => response.data.profile)
      .catch((error) => {
        throw Error(error.response.data.error);
      });
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(handleProfileUpdate.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.error = "";
    });

    builder.addCase(handleProfilGet.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.profile.zipCode = parseInt(state.profile.zipCode);
      state.error = "";
    });

    builder.addCase(handleProfilGet.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default profileSlice.reducer;

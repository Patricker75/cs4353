import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  profile: {
    name: "",
    mainAddress: "",
    auxAddress: "",
    city: "",
    state: "",
    zipcode: "",
  },
  isLoading: false,
  error: ""
};

export const updateProfile = createAsyncThunk(
  "profile/update",
  async (updatedProfile, { getState, rejectWithValue }) => {
    let state = getState();
    let username = state.auth.username;

    let config = {
      headers: {
        username,
      },
      body: {
        profile: updateProfile,
      },
    };

    return await axios
      .put("localhost:4001/api/updateProfile", config)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        rejectWithValue(err)
      });
  }
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateProfile.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.isLoading = false
      state.profile = action.payload
      state.error = ''
    })
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.isLoading = false,
      state.error = action.payload
    })
  }
})

export default profileSlice.reducer

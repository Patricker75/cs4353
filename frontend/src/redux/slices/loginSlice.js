import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    email: '',
    password: '',
    isAuthenticated: false,
    user: null,
    error: null,
  },
  reducers: {
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updatePassword: (state, action) => {
      state.password = action.payload;
    },
    loginStart: (state) => {
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.email = ''; // Clear email and password after successful login
      state.password = '';
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.email = '';
      state.password = '';
    },
  },
});

export const {
  updateEmail,
  updatePassword,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} = loginSlice.actions;

export default loginSlice.reducer;

// You don't need to export 'login' here.

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post('/api/auth/login', { email, password });
    const user = response.data;
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure('Invalid email or password'));
  }
};

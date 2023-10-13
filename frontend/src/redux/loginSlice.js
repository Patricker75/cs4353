import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    email: '',
    password: '',
    isAuthenticated: false,
  },
  reducers: {
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updatePassword: (state, action) => {
      state.password = action.payload;
    },
    login: (state) => {
      // Perform authentication logic here
      // Simulate a successful login
      state.isAuthenticated = true;
    },
    logout: (state) => {
      // Log out and set isAuthenticated to false
      state.isAuthenticated = false;
    },
  },
});

export const {
  updateEmail,
  updatePassword,
  login,
  logout,
} = loginSlice.actions;

export default loginSlice.reducer;

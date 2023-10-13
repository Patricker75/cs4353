import { createSlice } from '@reduxjs/toolkit';

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    email: '',
    password: '',
    isRegistered: false, // Add registration state
  },
  reducers: {
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updatePassword: (state, action) => {
      state.password = action.payload;
    },
    register: (state) => {
      // Implement registration logic here
      // Simulate a successful registration
      state.isRegistered = true;
    },
  },
});

export const {
  updateEmail,
  updatePassword,
  register,
} = registerSlice.actions;

export default registerSlice.reducer;

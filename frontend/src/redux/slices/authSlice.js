import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  username: '',
  isLoggedIn: false
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true
      state.username = action.username
    },
    logout: (state) => {
      state = initialState
    }
  }
})

export default authSlice.reducer
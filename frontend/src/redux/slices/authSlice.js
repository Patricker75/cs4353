import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  profile: {
    username: '',
    name: '',
    mainAddress: '',
    auxAddress: '',
    city: '',
    state: '',
    zipcode: ''
  },
  isLoggedIn: false
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true
      state.profile = action.payload
    },
    logout: (state) => {
      state = initialState
    },
    update: (state, action) => {
      state.profile = action.payload
    }
  }
})

export default authSlice.reducer
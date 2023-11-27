import { createSlice } from '@reduxjs/toolkit';

const clientProfileSlice = createSlice({
  name: 'clientProfile',
  initialState: {
    userID: '',
    name: '', // Add the "name" field
    mainAddress: '',
    auxAddress: '',
    city: '',
    state: '',
    zipcode: '',
  },
  reducers: {
    updateUserID: (state, action) => {
      state.userID = action.payload;
    },
    updateName: (state, action) => { // Add the "updateName" reducer
      state.name = action.payload;
    },
    updateMainAddress: (state, action) => {
      state.mainAddress = action.payload;
    },
    updateAuxAddress: (state, action) => {
      state.auxAddress = action.payload;
    },
    updateCity: (state, action) => {
      state.city = action.payload;
    },
    updateState: (state, action) => {
      state.state = action.payload;
    },
    updateZipcode: (state, action) => {
      state.zipcode = action.payload;
    },
  },
});

export const {
  updateUserID,
  updateName, // Add the "updateName" action
  updateMainAddress,
  updateAuxAddress,
  updateCity,
  updateState,
  updateZipcode,
} = clientProfileSlice.actions;


export default clientProfileSlice.reducer;

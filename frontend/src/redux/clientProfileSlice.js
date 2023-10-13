import { useDispatch, useSelector } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';

const clientProfileSlice = createSlice({
  name: 'clientProfile',
  initialState: {
    name: '',
    mainAddress: '',
    auxAddress: '',
    city: '',
    state: 'Alabama', // Default state
    zipcode: '',
  },
  reducers: {
    updateName: (state, action) => {
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
  updateName,
  updateMainAddress,
  updateAuxAddress,
  updateCity,
  updateState,
  updateZipcode,
} = clientProfileSlice.actions;

export default clientProfileSlice.reducer;

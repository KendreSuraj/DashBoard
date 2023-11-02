import { createSlice } from '@reduxjs/toolkit';
import { fetchPartner } from '../actions/partner.action';

const initialState = {
  partnerList: [],
  isLoading: false,
  error: null,
};

const partnerSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPartner.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPartner.fulfilled, (state, action) => {
      state.isLoading = false;
      state.partnerList = action.payload;
    });
    builder.addCase(fetchPartner.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default partnerSlice.reducer;

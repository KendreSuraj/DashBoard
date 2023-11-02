import { createSlice } from '@reduxjs/toolkit';
import { fetchBookings } from '../actions/booking.action';

const initialState = {
  bookingList: [],
  isLoading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBookings.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBookings.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bookingList = action.payload;
    });
    builder.addCase(fetchBookings.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default bookingSlice.reducer;

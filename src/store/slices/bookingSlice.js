import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBookings,
  fetchCityList,
  fetchProductList,
  fetchPaymentHistory
} from '../actions/booking.action';

const initialState = {
  bookingList: [],
  cityList: [],
  productList: [],
  paymentHistory:{},
  isLoading: true,
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
    builder.addCase(fetchCityList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCityList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cityList = action.payload.cityList;
    });
    builder.addCase(fetchCityList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchProductList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productList = action.payload.productList;
    });
    builder.addCase(fetchProductList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(fetchPaymentHistory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPaymentHistory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.paymentHistory = action.payload?.data;
    });
    builder.addCase(fetchPaymentHistory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default bookingSlice.reducer;

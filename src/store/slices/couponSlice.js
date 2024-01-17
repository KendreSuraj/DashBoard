import { createSlice} from "@reduxjs/toolkit";
import { fetchCoupon } from "../actions/couponsAction";

const initialState = {
    couponList: [],
    isLoading: false,
    error: null,
  };

  const couponSlice = createSlice({
    name: 'coupon',
    initialState,
    reducers: {},
    
    extraReducers: (builder) => {
      builder.addCase(fetchCoupon.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(fetchCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.couponList = action.payload;
      });
      builder.addCase(fetchCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    },
  });
  
  export default couponSlice.reducer;
  
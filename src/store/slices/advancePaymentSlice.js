import { createSlice } from "@reduxjs/toolkit";
import { listPayments } from "../actions/advancePayment.action";

const initialState = {
    paymentList: [],
    isLoading: false,
    error: null,
};

const advancePaymentSlice = createSlice({
    name: 'advancePayments',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(listPayments.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(listPayments.fulfilled, (state, action) => {
            console.log("========", action.payload)
            state.isLoading = false;
            state.paymentList = action.payload;
        });
        builder.addCase(listPayments.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    },
});

export default advancePaymentSlice.reducer;

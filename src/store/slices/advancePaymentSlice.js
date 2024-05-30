import { createSlice } from "@reduxjs/toolkit";
import { listPayments } from "../actions/advancePayment.action";
import { getVerificationUser } from "../actions/advancePayment.action";

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
            state.isLoading = false;
            state.paymentList = action.payload;
        });
        builder.addCase(listPayments.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(getVerificationUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getVerificationUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.verificationUser = action.payload;
        });
        builder.addCase(getVerificationUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    },
});

export default advancePaymentSlice.reducer;

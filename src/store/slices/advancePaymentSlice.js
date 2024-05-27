import { createSlice } from '@reduxjs/toolkit';
import { listPayments, getVerificationUser } from '../actions/advancePayment.action';

const initialState = {
    paymentList: [],
    isLoading: false,
    error: null,
    verificationUser: null,
};

const advancePaymentSlice = createSlice({
    name: 'advancePayments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle listPayments actions
            .addCase(listPayments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(listPayments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.paymentList = action.payload;
            })
            .addCase(listPayments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            // Handle getVerificationUser actions
            .addCase(getVerificationUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getVerificationUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.verificationUser = action.payload;
            })
            .addCase(getVerificationUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default advancePaymentSlice.reducer;
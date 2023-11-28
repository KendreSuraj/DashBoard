import { createSlice } from '@reduxjs/toolkit';
import { fetchIncentive, fetchIncentiveSeteps } from '../actions/incentive.action.js';

const initialState = {
    incentiveList: [],
    incentiveSteps: [],
    isLoading: false,
    error: null,
};

const incentiveSlice = createSlice({
    name: 'incentive',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchIncentive.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchIncentive.fulfilled, (state, action) => {
            state.isLoading = false;
            state.incentiveList = action.payload;
        });
        builder.addCase(fetchIncentive.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(fetchIncentiveSeteps.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchIncentiveSeteps.fulfilled, (state, action) => {
            state.isLoading = false;
            state.incentiveSteps = action.payload;
        });
        builder.addCase(fetchIncentiveSeteps.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    },
});

export default incentiveSlice.reducer;

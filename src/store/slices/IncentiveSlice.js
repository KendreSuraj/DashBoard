import { createSlice } from '@reduxjs/toolkit';
import { fetchIncentive, fetchIncentiveSteps, submitIncentive, finalIncentiveSubmit } from '../actions/incentive.action.js';

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

        builder.addCase(fetchIncentiveSteps.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchIncentiveSteps.fulfilled, (state, action) => {
            state.isLoading = false;
            state.incentiveSteps = action.payload;
        });
        builder.addCase(fetchIncentiveSteps.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        builder.addCase(submitIncentive.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(submitIncentive.fulfilled, (state, action) => { // eslint-disable-line no-unused-vars
            state.isLoading = false;
        });
        builder.addCase(submitIncentive.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        builder.addCase(finalIncentiveSubmit.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(finalIncentiveSubmit.fulfilled, (state, action) => { // eslint-disable-line no-unused-vars
            state.isLoading = false;
        });
        builder.addCase(finalIncentiveSubmit.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    },
});

export default incentiveSlice.reducer;

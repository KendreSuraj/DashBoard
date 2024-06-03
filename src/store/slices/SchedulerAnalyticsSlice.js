import { createSlice } from "@reduxjs/toolkit";
import { fetchTherapistAvailability, fetchMachineAvailability, fetchSlotData } from "../actions/SchedulerAnalytics.action";

const initialState = {
    therapistAnalytics: [],
    machineAnalytics: [],
    schedulerSlotData:null,
    isLoading: false,
    error: null,
};

const schedulerAnalyticsSlice = createSlice({
    name: 'schedulerAnalytics',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchTherapistAvailability.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchTherapistAvailability.fulfilled, (state, action) => {
            state.isLoading = false;
            state.therapistAnalytics = action.payload;
        });
        builder.addCase(fetchTherapistAvailability.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        builder.addCase(fetchMachineAvailability.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchMachineAvailability.fulfilled, (state, action) => {
            state.isLoading = false;
            state.machineAnalytics = action.payload;
        });
        builder.addCase(fetchMachineAvailability.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        builder.addCase(fetchSlotData.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchSlotData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.schedulerSlotData = action.payload;
        });
        builder.addCase(fetchSlotData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    },
});

export default schedulerAnalyticsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { fetchTherapist, fetchTherapistCustomslots, } from "../actions/therapist.action";

const initialState = {
    therapistList: [],
    therapistCustomSlot:[],
    isLoading: false,
    error: null,
};

const therapistSlice = createSlice({
    name: 'therapist',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchTherapist.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchTherapist.fulfilled, (state, action) => {
            state.isLoading = false;
            state.therapistList = action.payload;
        });
        builder.addCase(fetchTherapist.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        builder.addCase(fetchTherapistCustomslots.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchTherapistCustomslots.fulfilled, (state, action) => {
            state.isLoading = false;
            state.therapistCustomSlot = action.payload;
        });
        builder.addCase(fetchTherapistCustomslots.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    },
});

export default therapistSlice.reducer;

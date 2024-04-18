import { createSlice } from "@reduxjs/toolkit";
import { fetchMachine } from "../actions/machine.action";

const initialState = {
    machineList: [],
    isLoading: false,
    error: null,
};

const machineSlice = createSlice({
    name: 'machine',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchMachine.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchMachine.fulfilled, (state, action) => {
            state.isLoading = false;
            state.machineList = action.payload;
        });
        builder.addCase(fetchMachine.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    },
});

export default machineSlice.reducer;

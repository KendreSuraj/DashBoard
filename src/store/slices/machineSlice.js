import { createSlice } from "@reduxjs/toolkit";
import { fetchMachine,fetchMachineRecord } from "../actions/machine.action";

const initialState = {
    machineList: [],
    machineRecord:[],
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

        builder.addCase(fetchMachineRecord.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchMachineRecord.fulfilled, (state, action) => {
            state.isLoading = false;
            state.machineRecord = action.payload;
        });
        builder.addCase(fetchMachineRecord.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    },
});

export default machineSlice.reducer;

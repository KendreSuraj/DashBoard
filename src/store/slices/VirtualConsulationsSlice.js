import { createSlice } from '@reduxjs/toolkit';
import { getVirtualconsultations } from '../actions/Virtualconsultations.action';

const initialState = {
    VirtualConsulationList: [],
    isLoading: false,
    error: null,
};

const VirtualConsultationsSlice = createSlice({
    name: 'Virtualconsultation',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getVirtualconsultations.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getVirtualconsultations.fulfilled, (state, action) => {
            state.isLoading = false;
            state.VirtualConsulationList = action.payload;
        });
        builder.addCase(getVirtualconsultations.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    },
});


export default VirtualConsultationsSlice.reducer;

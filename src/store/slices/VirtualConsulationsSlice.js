import { createSlice } from '@reduxjs/toolkit';
import { changeVirtualConsultationsStatus, getVirtualconsultations } from '../actions/Virtualconsultations.action';

const initialState = {
    VirtualConsulationList: [],
    virtualConsultationStatus: 'idle',
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

        builder.addCase(changeVirtualConsultationsStatus.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(changeVirtualConsultationsStatus.fulfilled, (state, action) => {
            state.isLoading = false;
            state.virtualConsultationStatus = action.payload;
        });
        builder.addCase(changeVirtualConsultationsStatus.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    },
});


export default VirtualConsultationsSlice.reducer;

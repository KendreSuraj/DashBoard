import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchType: 'phoneNumber',
    searchText: '',
    selectedCities: [],
    selectedServices: [],
    selectedStatus: [],
    selectedPartners: []
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setSearchType(state, action) {
            state.searchType = action.payload;
        },
        setSearchText(state, action) {
            state.searchText = action.payload;
        },
        setSelectedCities(state, action) {
            console.log(action.payload);
            state.selectedCities = action.payload;
        },
        setSelectedServices(state, action) {
            state.selectedServices = action.payload;
        },
        setSelectedStatus(state, action) {
            state.selectedStatus = action.payload;
        },
        setSelectedPartners(state, action) {
            state.selectedPartners = action.payload;
        }
    },
});

export const { 
    setSearchType, 
    setSearchText, 
    setSelectedCities, 
    setSelectedServices, 
    setSelectedStatus, 
    setSelectedPartners 
  } = dashboardSlice.actions;

export default dashboardSlice.reducer;
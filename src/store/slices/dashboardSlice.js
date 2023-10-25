import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  upcomingBookings: [],
  pastBookings: [],
  upcomingBookingData: {},
  pastBookingData: {},
  isLoading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    todayBookings(state, action) {
      state.data = action.payload;
    },
  },
});

export const { todayBookings } = dashboardSlice.actions;
export default dashboardSlice.reducer;

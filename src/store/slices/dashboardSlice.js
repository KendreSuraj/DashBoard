import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';




export const gettodayBookings = createAsyncThunk('gettodaybookings', async () => {
    const res = await axios('/getbookings');
    const data = await res.data[0];
    return data;
  }); 

const dashboardSlice=createSlice({
    name:"dashboard",
    initialState:[],
    reducers:{
     todayBookings(state,action){
        state.push(action.payload)
     },
    }
})

console.log("test actions",dashboardSlice.actions)
export default dashboardSlice.reducer;
export const {todayBookings}=dashboardSlice.actions;


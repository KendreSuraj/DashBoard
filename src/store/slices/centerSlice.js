import { createSlice } from "@reduxjs/toolkit";
import { fetchCenter, fetchCity ,fetchAdmin} from "../actions/center.action";
import moment from "moment";

const initialState = {
    centerList: [],
    cityList: [],
    adminList:[],
    isLoading: false,
    error: null,
    centerId: 4,
    selectDate: {
    index: 0,
    date: moment().format('YYYY-MM-DD'),
    day: new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase(),
    }
};

const centerSlice = createSlice({
    name: 'center',
    initialState,
    reducers: {

        addCenterId(state, action){
            state.centerId = action.payload;
        },
        
        addDay(state, action){
            console.log(action.payload)
           
           
            state.selectDate = {
                ...state.selectDate,
                index: action.payload.index,
                day: action.payload.day,
                date: action.payload.date,
            }
            console.log(state.selectDate);
        },

        addDate(state, action){
            console.log(action.payload)
            console.log(new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase());
           
            state.selectDate = {
                ...state.selectDate,
                index: action.payload.index,
                day: action.payload.day,
                date: action.payload.date,
            }
            console.log(state.selectDate);
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchCenter.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchCenter.fulfilled, (state, action) => {
            state.isLoading = false;
            state.centerList = action.payload;
        });
        builder.addCase(fetchCenter.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        builder.addCase(fetchCity.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchCity.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cityList = action.payload;
        });
        builder.addCase(fetchCity.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        builder.addCase(fetchAdmin.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchAdmin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.adminList = action.payload;
        });
        builder.addCase(fetchAdmin.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    },
});


export const centerAction = centerSlice.actions;
export default centerSlice.reducer;

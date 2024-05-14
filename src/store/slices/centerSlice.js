import { createSlice } from "@reduxjs/toolkit";
import { fetchCenter, fetchCity ,fetchAdmin} from "../actions/center.action";

const initialState = {
    centerList: [],
    cityList: [],
    adminList:[],
    isLoading: false,
    error: null,
};

const centerSlice = createSlice({
    name: 'center',
    initialState,
    reducers: {},

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

export default centerSlice.reducer;

import { createSlice} from "@reduxjs/toolkit";
import { listPackages } from "../actions/packages.action";

const initialState = {
    packagesList: [],
    isLoading: false,
    error: null,
  };

  const packagesSlice = createSlice({
    name: 'packages',
    initialState,
    reducers: {},
    
    extraReducers: (builder) => {
      builder.addCase(listPackages.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(listPackages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.packagesList = action.payload;
      });
      builder.addCase(listPackages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    },
  });
  
  export default packagesSlice.reducer;
  
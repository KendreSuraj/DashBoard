import { createSlice } from '@reduxjs/toolkit';
import { fetchLogin } from '../actions/loginAction';

const initialState = {
  loginDetails: {},
  isLoading: false,
  error: null,
};

export const loginSlice = createSlice({
  name: 'loginUser',
  initialState,
  reducers: {
    resetLoginDetails: (state, action) => {
      state.loginDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.loginDetails = action.payload;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { resetLoginDetails } = loginSlice.actions;
export default loginSlice.reducer;

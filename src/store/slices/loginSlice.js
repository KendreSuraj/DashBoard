import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginDetails: {},
  isLoading: false,
  error: null,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.loginDetails = action.payload;
    },
  },
});

export const { loginUser } = loginSlice.actions;
export default loginSlice.reducer;

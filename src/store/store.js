import { configureStore } from '@reduxjs/toolkit';
import dashboardSlice from './slices/dashboardSlice';
import loginSlice from './slices/loginSlice';

const store = configureStore({
  reducer: {
    dashboard: dashboardSlice,
    login: loginSlice,
  },
});
export default store;

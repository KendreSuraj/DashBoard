import { configureStore } from '@reduxjs/toolkit';
import dashboardSlice from './slices/dashboardSlice';
import loginSlice from './slices/loginSlice';
import appStateSlice from './slices/appStateSlice';

const store = configureStore({
  reducer: {
    appState: appStateSlice,
    dashboard: dashboardSlice,
    login: loginSlice,
  },
});
export default store;

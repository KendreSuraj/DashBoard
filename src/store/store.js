import { configureStore } from '@reduxjs/toolkit';
import dashboardSlice from './slices/dashboardSlice';

const store = configureStore({
  reducer: { 
    dashboard: dashboardSlice
},
});
export default store;


import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './slices/loginSlice';
import appStateSlice from './slices/appStateSlice';
import bookingSlice from './slices/bookingSlice';
import partnerSlice from './slices/partnerSlice';
import productSlice from './slices/productSlice';

const store = configureStore({
  reducer: {
    appState: appStateSlice,
    login: loginSlice,
    booking: bookingSlice,
    partner: partnerSlice,
    product: productSlice,
  },
});
export default store;

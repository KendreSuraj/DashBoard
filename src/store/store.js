import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './slices/loginSlice';
import appStateSlice from './slices/appStateSlice';
import bookingSlice from './slices/bookingSlice';
import partnerSlice from './slices/partnerSlice';
import productSlice from './slices/productSlice';
import incentiveSlice from './slices/IncentiveSlice';
import couponSlice from './slices/couponSlice'
import VirtualConsultationsSlice from './slices/VirtualConsulationsSlice';
import usersSlice from './slices/usersSlice';
import faqSlice from './slices/faqSlice';
import centerSlice from './slices/centerSlice';
import machineSlice from './slices/machineSlice';
import therapistSlice from './slices/therapistSlice';
import packagesSlice from './slices/packagesSlice';
import advancePaymentSlice from './slices/advancePaymentSlice';

const store = configureStore({
  reducer: {
    appState: appStateSlice,
    login: loginSlice,
    booking: bookingSlice,
    partner: partnerSlice,
    product: productSlice,
    incentive: incentiveSlice,
    coupons: couponSlice,
    users: usersSlice,
    VirtualConsultation: VirtualConsultationsSlice,
    faq: faqSlice,
    center: centerSlice,
    machine: machineSlice,
    therapist: therapistSlice,
    packages: packagesSlice,
    advancePayments: advancePaymentSlice
  },
});
export default store;

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../../components/common/userLocalStorageUtils';

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchBookings = createAsyncThunk(
  'booking/fetchBookings',
  async (params) => {
    try {
      let bookingApiUrl = `${apiUrl}/api/v1/admin/booking/bookings?startDate=${params.startDate}&endDate=${params.endDate}&page=${params.page}`;
      if (params.searchType && params.searchText) {
        bookingApiUrl += `&${params.searchType}=${params.searchText}`;
      }

      if (params.serviceFilter) {
        bookingApiUrl += `&serviceFilter=${params.serviceFilter}`;
      }

      if (params.cityFilter) {
        bookingApiUrl += `&cityFilter=${params.cityFilter}`;
      }

      if (params.statusFilter) {
        bookingApiUrl += `&statusFilter=${params.statusFilter}`;
      }
      const res = await axios.get(bookingApiUrl, {
        headers: {
          Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
          token: getToken(),
        },
      });
      const data = res.data;
      return data;
    } catch (error) {
      console.error('Error in fetchBookings:', error);
      // throw error;
      return null;
    }
  },
);

export const fetchCityList = createAsyncThunk(
  'booking/fetchCityList',
  async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/v1/admin/booking/city-list`, {
        headers: {
          Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
          token: getToken(),
        },
      });
      const data = res.data;
      return data;
    } catch (error) {
      console.error('Error in fetchCityList:', error);
      throw error;
    }
  },
);

export const fetchProductList = createAsyncThunk(
  'booking/fetchProductList',
  async () => {
    try {
      const res = await axios.get(
        `${apiUrl}/api/v1/admin/booking/product-list`,
        {
          headers: {
            Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
            token: getToken(),
          },
        },
      );
      const data = res.data;
      return data;
    } catch (error) {
      console.error('Error in fetchProductList:', error);
      throw error;
    }
  },
);


export const fetchPaymentHistory = createAsyncThunk(
  'booking/fetchpaymenthistory',
  async (sessionScheduleId) => {
    try {
      const res = await axios.get(
        `${apiUrl}/api/v1/admin/booking/session-payment-history/${sessionScheduleId}`,
        {
          headers: {
            Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
            token: getToken(),
          },
        },
      );
      const data = res?.data?.data;
      return data;
    } catch (error) {
      console.error('Error in fetchpaymenthistory:', error);
      throw error;
    }
  },
);


export const addBookingPayment = async (formData) => {
  try {
    const res = await axios.post(
      `${apiUrl}/api/v1/admin/booking/make-session-payment`,
      formData,
      {
        headers: {
          Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
          token: getToken(),
        },
      },
    );
    const data = res.data;
    return data;
  } catch (error) {
    console.error('Error in Adding bookig payment', error);
    throw error;
  }
};
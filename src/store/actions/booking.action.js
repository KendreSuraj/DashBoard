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
      throw error;
    }
  },
);

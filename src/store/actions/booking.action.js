import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBookings = createAsyncThunk(
  'booking/fetchBookings',
  async (params) => {
    const res = await axios.get(
      `http://localhost:3001/api/v1/admin/booking/bookings?startDate=${params.startDate}&endDate=${params.endDate}`,
    );
    const data = await res.data.bookings;
    return data;
  },
);

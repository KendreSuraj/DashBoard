import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBookings = createAsyncThunk('booking/getbookings', async () => {
  const res = await axios.get('/');
  const data = await res.data.upcomingBookings;
  return data;
});

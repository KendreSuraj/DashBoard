import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBookings = createAsyncThunk('user/login', async () => {
  const res = await axios.post('/user/login');
  const data = await res.status;
  return data;
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../../components/common/userLocalStorageUtils';

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchMachine = createAsyncThunk('machine', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${apiUrl}/api/v1/center/get-machine`, {
      headers: {
        Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
        token: getToken(),
      },
    });
 
    return res?.data;
  } catch (error) {
    console.error('Error in fetchMachine:', error);
    return rejectWithValue('Failed to fetch Machines. Please try again later.');
  }
});

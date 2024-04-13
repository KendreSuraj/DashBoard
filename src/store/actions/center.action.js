import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../../components/common/userLocalStorageUtils';

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchCenter = createAsyncThunk('center', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${apiUrl}/api/v1/center/get-Center`, {
      headers: {
        Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
        token: getToken(),
      },
    });
 
    return res?.data;
  } catch (error) {
    console.error('Error in fetchCenter:', error);
    return rejectWithValue('Failed to fetch Centers. Please try again later.');
  }
});

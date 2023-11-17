import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../../components/common/userLocalStorageUtils';

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchPartner = createAsyncThunk('partner', async () => {
  try {
    const res = await axios.get(`${apiUrl}/api/v1/admin/partner/list`, {
      headers: {
        Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
        token: getToken(),
      },
    });
    const data = await res.data.partnerList;
    return data;
  } catch (error) {
    console.error('Error in fetchPartner:', error);
    throw error;
  }
});

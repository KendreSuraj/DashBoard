import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPartner = createAsyncThunk('partner', async () => {
  const res = await axios.get(
    'http://localhost:3001/api/v1/admin/partner/list',
  );
  const data = await res.data.partnerList;
  return data;
});

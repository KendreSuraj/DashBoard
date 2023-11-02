import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProduct = createAsyncThunk('products', async () => {
  const res = await axios.get(
    'http://localhost:3001/api/v1/admin/product/list',
  );
  const data = await res.data.productList;
  return data;
});

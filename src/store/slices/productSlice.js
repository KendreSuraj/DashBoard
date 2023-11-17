import { createSlice } from '@reduxjs/toolkit';
import {
  fetchProduct,
  fetchProductStepsTemplates,
} from '../actions/product.action';

const initialState = {
  productList: [],
  productSteptemplates: [],
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productList = action.payload;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchProductStepsTemplates.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductStepsTemplates.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productSteptemplates = action.payload;
    });
    builder.addCase(fetchProductStepsTemplates.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;

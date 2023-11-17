import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../../components/common/userLocalStorageUtils';

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchProduct = createAsyncThunk('products', async () => {
  try {
    const res = await axios.get(`${apiUrl}/api/v1/admin/product/list`, {
      headers: {
        Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
        token: getToken(),
      },
    });
    const data = await res.data.productList;
    return data;
  } catch (error) {
    console.error('Error in fetchPartner:', error);
    throw error;
  }
});

export const addStepTemplate = async (formData) => {
  try {
    const res = await axios.post(
      `${apiUrl}/api/v1/admin/step/add-step-template`,
      formData,
      {
        headers: {
          Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
          token: getToken(),
        },
      },
    );

    const data = res.data;
    return data;
  } catch (error) {
    console.error('Error in Add Step Template', error);
    throw error;
  }
};

export const fetchProductStepsTemplates = createAsyncThunk(
  'products-step',
  async (id) => {
    try {
      const res = await axios.get(
        `${apiUrl}/api/v1/admin/step/get-all-step-templates/${id}`,
        {
          headers: {
            Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
            token: getToken(),
          },
        },
      );
      const data = await res.data;
      return data;
    } catch (error) {
      console.error('Error in fetchPartner:', error);
      throw error;
    }
  },
);

export const UpdateStepTemplate = async (formData, id) => {
  try {
    const res = await axios.put(
      `${apiUrl}/api/v1/admin/step/update-step-template/${id}`,
      formData,
      {
        headers: {
          Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
          token: getToken(),
        },
      },
    );
    const data = res.data;
    return data;
  } catch (error) {
    console.error('Error in Add Step Template', error);
    throw error;
  }
};

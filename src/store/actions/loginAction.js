import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../../components/common/userLocalStorageUtils';

const apiUrl = process.env.REACT_APP_API_URL;
export const fetchLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }) => {
    try {
      const res = await axios.post(
        `${apiUrl}/api/v1/auth/login`,
        {
          email,
          password,
          role: 'ADMIN',
        },
        {
          headers: {
            Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
            token: '',
          },
        },
      );
      const data = res.data;
      return data;
    } catch (error) {
      alert(error?.response?.data?.status?.message);
      throw error;
    }
  },
);

export const logoutUser = async (id) => {
  try {
    const res = await axios.delete(`${apiUrl}/api/v1/auth/logout?id=${id}`, {
      headers: {
        Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
        token: getToken(),
      },
    });
    const data = res.data;
    return data;
  } catch (error) {
    console.error('Error in logout', error);
    throw error;
  }
};

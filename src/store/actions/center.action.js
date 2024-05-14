import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../../components/common/userLocalStorageUtils';

const apiUrl = process.env.REACT_APP_SCHEDULER_API_URL;

export const fetchCenter = createAsyncThunk('center', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${apiUrl}/api/v1/center/get-centers`);
    return res?.data;
  } catch (error) {
    return rejectWithValue('Failed to fetch Centers. Please try again later.');
  }
});

export const addCenter = async (data) => {
  try {
    const res = await axios.post(`${apiUrl}/api/v1/center/add-center`, data);
    return res;
  } catch (error) {
    return error;
  }

};
export const UpdateCenter = async (id, data) => {
  try {
    const res = await axios.put(`${apiUrl}/api/v1/center/update-center/${id}`, data);
    return res;
  } catch (error) {
    console.error("Error adding center:", error);
  }
}



export const fetchCity = createAsyncThunk('city', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${apiUrl}/api/v1/city/get-cities`);
    return res?.data;
  } catch (error) {
    return rejectWithValue('Failed to fetch Centers. Please try again later.');
  }
});


export const fetchAdmin = createAsyncThunk('adminlist', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${apiUrl}/api/v1/misc/get-admins`);
    return res?.data?.adminList[0];
  } catch (error) {
    return rejectWithValue('Failed to fetch Centers. Please try again later.');
  }
});
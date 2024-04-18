import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../../components/common/userLocalStorageUtils';

const apiUrl = process.env.REACT_APP_SCHEDULER_API_URL;

export const fetchCenter = createAsyncThunk('center', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${apiUrl}/api/v1/center/get-centers`);
    console.log("see res------->>>", res)
    return res?.data;
  } catch (error) {
    console.error('Error in fetchCenter:', error);
    return rejectWithValue('Failed to fetch Centers. Please try again later.');
  }
});

export const addCenter = async (data) => {
  console.log("see daata-------->>>>>>", data)
  try {
    const res = await axios.post(`${apiUrl}/api/v1/center/add-center`, data);
    console.log("Center added successfully!---->>>>", res);
    return res;
  } catch (error) {
    console.error("Error adding center:", error);
    return error;
  }

};
export const UpdateCenter = async (id, data) => {
  console.log("see daata-------->>>>>>", id)
  try {
    const res = await axios.put(`${apiUrl}/api/v1/center/update-center/${id}`, data);
    console.log("Center added successfully!---->>>>", res);
    return res;
  } catch (error) {
    console.error("Error adding center:", error);
  }
}



export const fetchCity = createAsyncThunk('city', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${apiUrl}/api/v1/city/get-cities`);
    console.log("see res------->>>", res)
    return res?.data;
  } catch (error) {
    console.error('Error in fetchCenter:', error);
    return rejectWithValue('Failed to fetch Centers. Please try again later.');
  }
});


export const fetchAdmin = createAsyncThunk('adminlist', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${apiUrl}/api/v1/misc/get-admins`);
    console.log("see res------->>>", res)
    return res?.data;
  } catch (error) {
    console.error('Error in fetchCenter:', error);
    return rejectWithValue('Failed to fetch Centers. Please try again later.');
  }
});
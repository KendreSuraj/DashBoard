import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../../components/common/userLocalStorageUtils';

const apiUrl = process.env.REACT_APP_SCHEDULER_API_URL;

export const fetchMachine = createAsyncThunk('machine', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${apiUrl}/api/v1/machine/get-all-machines`);
    console.log("hiiiiiiiiiiiiiiiii------>>>>>", res)
    return res?.data;
  } catch (error) {
    console.error('Error in fetchMachine:', error);
    return rejectWithValue('Failed to fetch Machines. Please try again later.');
  }
});

export const addMachine = async (data) => {
  console.log("see daata-------->>>>>>", data)
  try {
    const res = await axios.post(`${apiUrl}/api/v1/machine/add-machine`, data);
    console.log("Center added successfully!---->>>>", res);
    return res;
  } catch (error) {
    console.error("Error adding center:", error);
    return error;
  }

};

export const UpdateMachine = async (id, data) => {
  console.log("see daata-------->>>>>>", id)
  try {
    const res = await axios.put(`${apiUrl}/api/v1/machine/update-machine/${id}`, data);
    console.log("Center added successfully!---->>>>", res);
    return res;
  } catch (error) {
    console.error("Error adding center:", error);
  }
}

export const addMachineRequest = async (data) => {
  console.log("see daata-- request------>>>>>>", data)
  try {
    const res = await axios.post(`${apiUrl}/api/v1/custom-machine-slot/add-machine-custom-slot`, data);
    return res;
  } catch (error) {
    console.error("Error adding center:", error);
  }
}


export const fetchMachineRecord = createAsyncThunk('machine/record', async (id, { rejectWithValue }) => {
  console.log("see id for record-->>",id)
  try {
    const res = await axios.get(`${apiUrl}/api/v1/custom-machine-slot/get-machine-custom-slots/${id}`);
    console.log("--======",res)
    return res?.data?.slotDetails;
  } catch (error) {
    console.error('Error in fetchMachine:', error);
    return rejectWithValue('Failed to fetch Machines. Please try again later.');
  }
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_SCHEDULER_API_URL;

export const fetchTherapistAvailability = createAsyncThunk('scheduler-therapist-analytics', async (centerId, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${apiUrl}/api/v1/therapist/get-all-therapists-for-center/${centerId}`);
    return res?.data;
  } catch (error) {
    return rejectWithValue('Failed to fetch Machines. Please try again later.');
  }
});

export const fetchMachineAvailability = createAsyncThunk('scheduler-machine-analytics', async (centerId, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${apiUrl}/api/v1/machine/get-all-machines-for-center/${centerId}`);
    return res?.data;
  } catch (error) {
    return rejectWithValue('Failed to fetch Machines. Please try again later.');
  }
});

export const fetchSlotData = createAsyncThunk('scheduler-slot-data', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${apiUrl}/api/v1/slot/get-slot-count?centerId=${data?.centerId}&date=${data?.selectedDay}`);
    return res?.data;
  } catch (error) {
    return rejectWithValue('Failed to fetch Machines. Please try again later.');
  }
});

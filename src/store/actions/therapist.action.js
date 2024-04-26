import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_SCHEDULER_API_URL;

export const fetchTherapist = createAsyncThunk('therapist', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${apiUrl}/api/v1/therapist/get-all-therapists`);
    return res?.data;
  } catch (error) {
    return rejectWithValue('Failed to fetch Machines. Please try again later.');
  }
});


export const addTherapist = async (data) => {
    try {
      const res = await axios.post(`${apiUrl}/api/v1/therapist/add-therapist`, data);
      return res;
    } catch (error) {
      return error;
    }
  
  };

  export const fetchTherapistCustomslots = createAsyncThunk('therapist-custom-slot', async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${apiUrl}/api/v1/custom-therapist-slot/get-all-therapist-custom-slots`);
      return res?.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch Centers. Please try again later.');
    }
  });


  export const UpdateTherapist = async (id, data) => {
    try {
      const res = await axios.put(`${apiUrl}/api/v1/therapist/update-therapist/${id}`, data);
      return res;
    } catch (error) {
      console.error("Error adding center:", error);
    }
  }




  export const updateCustomTherapistSlot  = async (id, data) => {
    console.log("see daata-------->>>>>>", id)
    try {
      const res = await axios.put(`${apiUrl}/api/v1/custom-therapist-slot/update-therapist-custom-slot/${id}`,data);
      console.log("Center added successfully!---->>>>", res);
      return res;
    } catch (error) {
      console.error("Error adding center:", error);
    }
  }

  export const fetchTherapistRecord = createAsyncThunk('therapist/record', async (therapistId, { rejectWithValue }) => {
    console.log("see id for record-->>",therapistId)
    try {
      const res = await axios.get(`${apiUrl}/api/v1/custom-therapist-slot/get-therapist-custom-slots/${therapistId}`);
      console.log("--======",res)
      return res?.data?.slotDetails;
    } catch (error) {
      console.error('Error in fetchMachine:', error);
      return rejectWithValue('Failed to fetch Machines. Please try again later.');
    }
  });
  
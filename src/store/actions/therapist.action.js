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
    return error;
  }
}




export const updateCustomTherapistSlot = async (id, data) => {
  try {
    const res = await axios.put(`${apiUrl}/api/v1/custom-therapist-slot/update-therapist-custom-slot/${id}`, data);
    return res;
  } catch (error) {
    return error;
  }
}

export const fetchTherapistRecord = createAsyncThunk('therapist/record', async (therapistId, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${apiUrl}/api/v1/custom-therapist-slot/get-therapist-custom-slots/${therapistId}`);
    return res?.data?.slotDetails;
  } catch (error) {
    return rejectWithValue('Failed to fetch Machines. Please try again later.');
  }
});


export const fetchAvailableTherapist = createAsyncThunk('available/therapist', async (body, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${apiUrl}/api/v1/allocate/candidate-therapist-list`, body);
    return res?.data?.therapistList
      ;
  } catch (error) {
    return rejectWithValue('Failed to available fetch Therapists. Please try again later.');
  }
});

export const reAllocateTherapist = async (data) => {
  try {
    const res = await axios.post(`${apiUrl}/api/v1/allocate/allot-therapist`, data);
    return res;
  } catch (error) {
    return error;
  }
}


export const manualTherapistAllocation = async (data) => {
  try {
    const res = await axios.post(`${apiUrl}/api/v1/allocate/manual-therapist-allot`, data);
    return res;
  } catch (error) {
    return error;
  }
}

export const getClientSlots = async (data) => {
  try {
    const res = await axios.post(`${apiUrl}/api/v1/slot/get-client-slots`, data);
    return res;
  } catch (error) {
    return error;
  }
}


export const confirmClientSlots = async (data) => {
  try {
    const res = await axios.post(`${apiUrl}/api/v1/allocate/reschedule-booking`, data);
    return res;
  } catch (error) {
    return error;
  }
}

export const cancelBooking = async (data) => {
  try {
    const res = await axios.post(`${apiUrl}/api/v1/allocate/cancel-booking`, data);
    return res;
  } catch (error) {
    return error;
  }
}


export const autoAllocateTherapistAndMachine = async (data) => {
  try {
    const res = await axios.post(`${apiUrl}/api/v1/allocate/auto-allocate`, data);
    return res;
  } catch (error) {
    return error;
  }
}

export const addTherapistUnavailabilityAndLeave = async (
  addTherapistUnavailabilityAndLeaveBody
) => {
  try {
    const res = await axios.post(
      `${apiUrl}/api/v1/custom-therapist-slot/add-therapist-custom-slot`,
      addTherapistUnavailabilityAndLeaveBody
    );
    return res.data;
  } catch (err) {
    return err.response.data.status.message;
  }
};

export const markTherapistFree = async (data) => {
  try {
    const res = await axios.post(`${apiUrl}/api/v1/allocate/mark-therapist-available`, data);
    return res;
  } catch (error) {
    return error;
  }
}


export const deAllocateTherapist = async (data) => {
  try {
    const res = await axios.post(`${apiUrl}/api/v1/allocate/deallocate-therapist`, data);
    return res;
  } catch (error) {
    return error;
  }
}
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../../components/common/userLocalStorageUtils';

const apiUrl = process.env.REACT_APP_SCHEDULER_API_URL;

export const fetchMachine = createAsyncThunk('machine', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${apiUrl}/api/v1/machine/get-all-machines`);
    return res?.data;
  } catch (error) {
    return rejectWithValue('Failed to fetch Machines. Please try again later.');
  }
});

export const addMachine = async (data) => {
  try {
    const res = await axios.post(`${apiUrl}/api/v1/machine/add-machine`, data);
    return res;
  } catch (error) {
    return error;
  }

};

export const UpdateMachine = async (id, data) => {
  try {
    const res = await axios.put(`${apiUrl}/api/v1/machine/update-machine/${id}`, data);
    return res;
  } catch (error) {
    return error;
  }
}

export const addMachineRequest = async (data) => {
  try {
    const res = await axios.post(`${apiUrl}/api/v1/custom-machine-slot/add-machine-custom-slot`, data);
    return res;
  } catch (error) {
    return error;
  }
}


export const fetchMachineRecord = createAsyncThunk('machine/record', async (id, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${apiUrl}/api/v1/custom-machine-slot/get-machine-custom-slots/${id}`);
    return res?.data?.slotDetails;
  } catch (error) {
    return rejectWithValue('Failed to fetch Machines. Please try again later.');
  }
});



export const fetchProducts = createAsyncThunk('machine/products', async (id, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${apiUrl}/api/v1/misc/get-products`);
    return res?.data?.productList;
  } catch (error) {
    return rejectWithValue('Failed to fetch Machines. Please try again later.');
  }
});


export const fetchAvailableMachine = createAsyncThunk('availab/machine', async (body, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${apiUrl}/api/v1/allocate/candidate-machine-list`, body);
    return res?.data?.machineList;
  } catch (error) {
    return rejectWithValue('Failed to available fetch Machines. Please try again later.');
  }
});




export const reAllocateMachine = async (data) => {
  try {
    const res = await axios.post(`${apiUrl}/api/v1/allocate/allot-machine`, data);
    return res;
  } catch (error) {
    return error;
  }
}



export const manualAllocateMachine = async (data) => {
  try {
    const res = await axios.post(`${apiUrl}/api/v1/allocate/manual-machine-allot`, data);
    return res;
  } catch (error) {
    return error;
  }
}

export const markMachineFree = async (data) => {
  try {
    const res = await axios.post(`${apiUrl}/api/v1/allocate/mark-machine-available`, data);
    return res;
  } catch (error) {
    return error;
  }
}

export const deAllocateMachine = async (data) => {
  try {
    const res = await axios.post(`${apiUrl}/api/v1/allocate/deallocate-machine`, data);
    return res;
  } catch (error) {
    return error;
  }
}


export const markMachineSlotFree = async (data) => {
  try {
    const res = await axios.post(`${apiUrl}/api/v1/custom-machine-slot/free-machine-slot`, data);
    return res.data;
  } catch (error) {
    return error;
  }
}

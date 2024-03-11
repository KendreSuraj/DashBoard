import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../../components/common/userLocalStorageUtils';


const apiUrl = process.env.REACT_APP_API_URL;


export const getVirtualconsultations = createAsyncThunk('/Virtualconsultations', async () => {
  try {
    const res = await axios.get(`${apiUrl}/api/v1/admin/avataar/crm_app_consultations`, {
      headers: {
        Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
        token: getToken(),
      },
    });
    return res.data?.data;;
  } catch (error) {
    console.error('Error in fetchPartner:', error);
    throw error;
  }
});


export const changeVirtualConsultationsStatus = createAsyncThunk(
  'virtualConsultations/changeStatus',
  async ({ id, newStatus }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${apiUrl}/api/v1/admin/avataar/change_crm_app_consultations_status/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
            token: getToken(),
          },
        }
      );
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
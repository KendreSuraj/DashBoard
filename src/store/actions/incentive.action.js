import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../../components/common/userLocalStorageUtils';

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchIncentive = createAsyncThunk(
  'incentive/fetchIncentive',
  async (params) => {
    try {
      const res = await axios.get(
        `${apiUrl}/api/v1/admin/partner/checked-list?startDate=${params.startDate}&endDate=${params.endDate}&type=${params.type}&page=${params.page}`,
        {
          headers: {
            Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
            token: getToken(),
          },
        },
      );
      const data = res?.data;
      return data;
    } catch (error) {
      console.error('Error in fetchIncentive:', error);
      throw error;
    }
  },
);

export const fetchIncentiveSteps = createAsyncThunk(
  'incentive/fetchIncentiveSteps',
  async (params) => {
    try {
      const res = await axios.get(`${apiUrl}/api/v1/admin/partner/incentive?sessionId=${params.sessionId}&sessionSchedulesId=${params.sessionSchedulesId}&partnerId=${params.partnerId}&productId=${params.productId}`, {
        headers: {
          Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
          token: getToken(),
        },
      },);
      const data = res?.data?.result
      return data;
    } catch (error) {
      console.error("Error in fetchIncentiveSteps")
      throw error;
    }
  }
)

export const submitIncentive = createAsyncThunk(
  'incentive/submitincentive',
  async (body) => {
    try {
      const res = await axios.post(
        `${apiUrl}/api/v1/admin/partner/check-incentive`,
        body,
        {
          headers: {
            Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
            token: getToken(),
          },
        },
      );

      const data = res.data;
      if (data.status.code === 200) {
        alert(data.status.message)
        window.location.reload(0, 0)
        return data;
      }
    } catch (error) {
      console.error('Error in submit incentive', error);
      throw error;
    }
  })

export const finalIncentiveSubmit = createAsyncThunk(
  'incentive/finalincentivesubmit',
  async (body) => {
    try {
      const res = await axios.post(
        `${apiUrl}/api/v1/admin/partner/submit-incentive`,
        body,
        {
          headers: {
            Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
            token: getToken(),
          },
        },
      );

      const data = res.data;
      if (data.status.code === 200) {
        alert(data.status.message)
      }
      return data;
    } catch (error) {
      console.error('Error in Final Submit', error);
      throw error;
    }
  });


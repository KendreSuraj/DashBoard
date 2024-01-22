import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../../components/common/userLocalStorageUtils";

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchCoupon = createAsyncThunk('coupons', async () => {
  try {
    const res = await axios.get(`${apiUrl}/api/v1/admin/coupon/list`, {
      headers: {
        Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
        token: getToken(),
      },
    });
    const data = await res.data.coupons;
    return data;
  }
  catch (error) {
    console.error('Error in Partner:', error);
    throw error;
  }
});


export const deleteCoupon = async (id) => {
  try {
    const res = await axios.delete(`${apiUrl}/api/v1/admin/coupon/delete?id=${id}`, {
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
}


export const addCoupon = async (formData) => {
  try {
    const res = await axios.post(
      `${apiUrl}/api/v1/admin/coupon/add-new`,
      formData,
      {
        headers: {
          Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
          token: getToken(),
        },
      },
    );

    const data = res.data;
    return data;
  } catch (error) {
    console.error('Error in Add coupon', error);
    throw error;
  }
};
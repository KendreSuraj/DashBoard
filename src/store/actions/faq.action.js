import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../../components/common/userLocalStorageUtils";


const apiUrl = process.env.REACT_APP_API_URL;

export const fetchFAQ = createAsyncThunk('faq', async () => {
  try {
    const res = await axios.get(`${apiUrl}/api/v1/admin/faq/get-all-faq?limit=1000`, {
      headers: {
        Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
        token: getToken(),
      },
    });
    const data = await res.data.data;
    return data
  }
  catch (error) {
    console.error('Error in FAQs:', error);
    throw error;
  }
});

export const addFAQ = async (formData) => {
  try {
    const res = await axios.post(
      `${apiUrl}/api/v1/admin/faq/add-question`,
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

export const deleteFAQ = async (id) => {
  try {
    const res = await axios.patch(`${apiUrl}/api/v1/admin/faq/delete/${id}`,
    null,
    {
      headers: {
        Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
        token: getToken(),
      },
    });
    const data = res.data;
    return data;
  } catch (error) {
    console.error('Error in deleting FAQs', error);
    throw error;
  }
}



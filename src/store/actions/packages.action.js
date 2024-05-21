import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../../components/common/userLocalStorageUtils";

const apiUrl = process.env.REACT_APP_API_URL;

export const listPackages = createAsyncThunk('packages', async (page) => {
    try {
      const res = await axios.get(`${apiUrl}/api/v1/admin/package/list?pageNumber=${page}&limit=10`, {

        headers: {
          Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
          token: getToken(),
        },
      });
      const data = await res.data.data;
      // console.log(data)
      return data;
    }
    catch (error) {
      console.error('Error in Partner:', error);
      throw error;
    }
  });
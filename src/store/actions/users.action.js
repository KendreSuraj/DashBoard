import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../../components/common/userLocalStorageUtils";

const apiUrl = process.env.REACT_APP_API_URL;

export const getUsers = createAsyncThunk('coupons', async () => {
    try {
        const res = await axios.get(`${apiUrl}/api/v1/admin/user/get-users`, {
            headers: {
                Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
                token: getToken(),
            },
        });
        const data = await res.data.users;
        return data;
    }
    catch (error) {
        console.error('Error in Partner:', error);
        throw error;
    }
});

export const addUser = async (formData) => {
    try {
        const res = await axios.post(
            `${apiUrl}/api/v1/admin/user/add-user`,
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
        console.error('Error in Adding user', error);
        throw error;
    }
};

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../../components/common/userLocalStorageUtils";

const apiUrl = process.env.REACT_APP_API_URL;

export const listPayments = createAsyncThunk('advancePayments', async () => {
    try {
        const res = await axios.get(`${apiUrl}/api/v1/admin/advance-payment/list-of-payments`, {

            headers: {
                Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
                token: getToken(),
            },
        });
        const data = await res.data.list;

        // console.log(data)
        return data;
    }
    catch (error) {
        console.error('Error in Partner:', error);
        throw error;
    }
});

export const getVerificationUser = createAsyncThunk('advancePayment', async () => {
    try {
        const res = await axios.get(`${apiUrl}/api/v1/admin/advance-payment/get-verification-user`, {

            headers: {
                Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
                token: getToken(),
            },
        });
        const data = await res.data.user;

        // console.log(data)
        return data;
    }
    catch (error) {
        console.error('Error in Partner:', error);
        throw error;
    }
});


export const getTransactionHistory = createAsyncThunk('transaction', async (id) => {
    try {
        const res = await axios.get(`${apiUrl}/api/v1/admin/advance-payment/transaction-history/${id}`, {

            headers: {
                Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
                token: getToken(),
            },
        });
        const data = await res.data.list;

        // console.log(data)
        return data;
    }
    catch (error) {
        console.error('Error in Partner:', error);
        throw error;
    }
});
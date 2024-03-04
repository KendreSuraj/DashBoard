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

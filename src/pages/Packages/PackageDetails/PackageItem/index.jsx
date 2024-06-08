import React, { useState } from 'react';
import { TextField, FormControl } from '@mui/material';
import axios from 'axios';
import { getToken } from '../../../../components/common/userLocalStorageUtils';
import Autocomplete from '@mui/material/Autocomplete';

const PackageItem = ({ index, rule, names, onChange, setPrice, price }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [productSession, setProductSession] = useState();
    const [previousSession, setPreviousSession] = useState();

    const handleProductChange = async (event) => {
        if (event.target.innerHTML !== "") {
            const productSessions = await axios.get(`${apiUrl}/api/v1/admin/product/session/${parseInt(event.target.innerHTML.split('.')[0], 10)}`, {
                headers: {
                    Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
                    token: getToken(),
                },
            });
            setProductSession(productSessions.data.productSessions);
            const productId = event.target.innerHTML;
            onChange(index, { ...rule, productId });
        }
    };

    const handleSessionsChange = (event) => {
        const sessions = event.target.value;
        if (sessions === '0') {
            alert("Sessions should be greater than or equal to 1");
        } else if (sessions > productSession.length) {
            alert(`Sessions should be less than or equal to ${productSession.length}`);
        }
        else if (sessions < 1) {
            console.log(price)
            console.log(productSession[sessions - 1]?.price)
            setPrice(parseInt(price, 10) - parseInt(productSession[previousSession - 1]?.price, 10))
            onChange(index, { ...rule, sessions });

        }
        else {
            setPrice(parseInt(price, 10) + parseInt(productSession[sessions - 1]?.price, 10))
            onChange(index, { ...rule, sessions });
            setPreviousSession(sessions)
        }

    };
    const productID = parseInt(rule.productId);

    return (
        <div style={{ display: "flex", gap: "20px" }}>
            <FormControl style={{ width: "400px" }}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={names}
                    value={names[productID - 1]}
                    onChange={handleProductChange}
                    sx={{ width: 400 }}
                    renderInput={(params) => <TextField {...params} label="Products" />}
                />
            </FormControl>

            <TextField
                variant="outlined"
                label="No of sessions"
                name="sessions"
                type='number'
                value={rule.sessions}
                onChange={handleSessionsChange}
                required
            />
            {productSession && <p style={{ fontSize: "20px", paddingTop: "10px" }}>Max number of Sessions Allowed: {productSession?.length}</p>}
        </div>
    );
};

export default PackageItem;

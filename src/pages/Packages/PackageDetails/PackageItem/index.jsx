import React, { useState } from 'react';
import { TextField, FormControl, FormControlLabel, Checkbox } from '@mui/material';
import axios from 'axios';
import { getToken } from '../../../../components/common/userLocalStorageUtils';
import Autocomplete from '@mui/material/Autocomplete';

const bodyparts = ["Hands", "Chest", "Legs", "Abdomen", "Head", "Face"];

const PackageItem = ({ index, rule, names, onChange, setPrice, price, onDelete }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [productSession, setProductSession] = useState();
    const [previousSession, setPreviousSession] = useState();
    const packageType = localStorage.getItem('packageDetail');
    // const [addBodyParts, setAddBodyParts] = useState(false);
    // const [parts, setParts] = useState([]);

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
        else if (sessions < 0) {
            alert("Cannot add negative values")
        }
        else if (sessions < 1) {
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

    // const handleCheckboxChange = (event) => {
    //     setAddBodyParts(event.target.checked);
    // };

    // const handleBodyParts = (event, value) => {
    //     setParts(value);
    // }

    return (
        <div style={{ display: "flex", gap: "20px" }}>
            <div>
                <FormControl style={{ width: "400px" }}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={names}
                        value={names[productID - 1]}
                        onChange={handleProductChange}
                        sx={{ width: 400 }}
                        disabled={packageType === "edit" && rule.sessions}
                        renderInput={(params) => <TextField {...params} label="Products" />}
                    />
                </FormControl>
                {productSession && !rule.sessions && <p style={{ fontSize: "20px", paddingTop: "10px" }}>Max number of Sessions Allowed: {productSession?.length}</p>}
            </div>

            <TextField
                variant="outlined"
                label="No of sessions"
                name="sessions"
                type='tel'
                className="hide-spinner"
                value={rule.sessions}
                disabled={packageType === "edit" && rule.sessions}
                onChange={handleSessionsChange}
                required
            />
            {/* {!rule.sessions &&
                <>
                    <FormControlLabel
                        control={<Checkbox checked={addBodyParts} onChange={handleCheckboxChange} />}
                        label="Want to add body parts?"
                    />

                    {addBodyParts && (
                        <FormControl sx={{ width: "330px" }}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={bodyparts}
                                value={parts}
                                onChange={handleBodyParts}
                                multiple
                                renderInput={(params) => <TextField {...params} variant="outlined" label="Body Parts" />}
                            />
                        </FormControl>
                    )}
                </>
            } */}
            {packageType === "edit" && rule.sessions && <button style={{
                backgroundColor: "rgb(215, 0, 64)",
                borderColor: "rgb(215, 0, 64)",
                color: "white",
                cursor: "pointer",
                width: "100px",
                borderRadius: "10px"
            }}
                onClick={onDelete}>DELETE</button>}
        </div>
    );
};

export default PackageItem;

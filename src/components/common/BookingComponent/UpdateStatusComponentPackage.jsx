// UpdateStatusComponent.js
import React, { useEffect, useState } from 'react';
import { Paper, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { getToken } from '../userLocalStorageUtils';

const UpdateStatusComponentPackage = (props) => {
    // const [selectedStatus, setSelectedStatus] = useState("");
    const [sessionStatus, setSessionStatus] = useState([])

    const handleStatusChange = (event) => {
        const str = event.target.value
        const sessionId = str.split(" ")[0]
        console.log("session ID", sessionId)
        const newSessionStatus = sessionStatus.map((data) => {
            if (sessionId == data.sessionId) {
                return {
                    ...data,
                    status: str.split(" ")[1]
                }
            } else {
                return {
                    ...data
                }
            }
        })
        console.log("new state", newSessionStatus)
        setSessionStatus(newSessionStatus)
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/api/v1/admin/booking/update-package-session-status`,
                {
                    sessionScheduleId: props.sessionScheduleId,
                    statusData: sessionStatus
                },
                {
                    headers: {
                        Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
                        token: getToken(),
                    },
                },
            )
            .then((response) => {
                console.log(response.data);
                window.location.reload();
            })
            .catch((err) => console.log(err));



    };
    useEffect(() => {
        if (props.packageSessionData) {
            setSessionStatus(props.packageSessionData)
        }
    }, [props.packageSessionData])


    // useEffect(() => {
    //     setSelectedStatus(props.selectedStatus)
    // }, [props.selectedStatus])
    return (
        <div>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                <h3>Change Package Session Status</h3>
                <form >
                    {
                        sessionStatus && sessionStatus.length > 0 ? sessionStatus.map(data => (
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="status-label">Status for {data.productName}</InputLabel>
                                <Select
                                    labelId="status-label"
                                    label="Status"
                                    value={`${data.sessionId} ${data.status}`}  // Provide the selected value
                                    onChange={handleStatusChange}
                                >
                                    <MenuItem value={`${data.sessionId} PENDING`}>PENDING</MenuItem>
                                    <MenuItem value={`${data.sessionId} COMPLETED`}>COMPLETED</MenuItem>
                                    <MenuItem value={`${data.sessionId} SCHEDULED`}>SCHEDULED</MenuItem>
                                    <MenuItem value={`${data.sessionId} CANCELLED`}>CANCELLED</MenuItem>
                                    <MenuItem value={`${data.sessionId} SESSION_START`}>SESSION_START</MenuItem>
                                    <MenuItem value={`${data.sessionId} SESSION_END`}>SESSION_END</MenuItem>
                                </Select>
                            </FormControl>
                        )) : ""
                    }

                    <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                </form>
            </Paper>
        </div>
    );
};

export default UpdateStatusComponentPackage;

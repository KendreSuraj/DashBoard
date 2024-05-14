// UpdateStatusComponent.js
import React, { useEffect, useState } from 'react';
import { Paper, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { autoAllocateTherapistAndMachine, cancelBooking } from '../../../store/actions/therapist.action';

const UpdateStatusComponentV2 = (props) => {
    const [selectedStatus, setSelectedStatus] = useState("");
    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };
    const body = props?.body
    console.log("see body", body)

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedStatus.length < 1) {
            alert("Please select a status")
            return
        }
        const reqBody = {
            slotDate: body?.slotDate,
            slotTime: body?.slotTime,
            productId: body?.productId,
            sessionScheduleId: body?.sessionScheduleId,
        }
        if (props?.selectedStatus !== "CANCELLED" && selectedStatus === "CANCELLED") {
            const res = await cancelBooking(reqBody)
            if (res?.status === 200) {
                alert(res.data?.status?.message);
                window.location.reload()
            }else{
                alert()
            }
        } else if (props?.selectedStatus === "CANCELLED" && selectedStatus === "SCHEDULED") {
            const res = await autoAllocateTherapistAndMachine(body)
            if (res?.status === 200) {
                alert(res.data?.status?.message);
                window.location.reload()
            }
        }
        else {
            props.updateStatusHandler(selectedStatus)
        }

    };

    useEffect(() => {
        setSelectedStatus(props.selectedStatus)
    }, [props.selectedStatus])
    return (
        <div>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                <h3>Change Status</h3>
                <form >
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            labelId="status-label"
                            label="Status"
                            value={selectedStatus}  // Provide the selected value
                            onChange={handleStatusChange}
                        >
                            {/* <MenuItem value="PENDING" disabled>PENDING</MenuItem> */}
                            <MenuItem value="COMPLETED" disabled>COMPLETED</MenuItem>
                            <MenuItem value="SCHEDULED">SCHEDULED</MenuItem>
                            <MenuItem value="CANCELLED">CANCELLED</MenuItem>
                            {/* <MenuItem value="POSTPONED" disabled>POSTPONED</MenuItem> */}
                            <MenuItem value="PAID" disabled>PAID</MenuItem>
                            <MenuItem value="SESSION_START" disabled>SESSION_START</MenuItem>
                            {/* <MenuItem value="SESSION_END" disabled>SESSION_END</MenuItem> */}
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                </form>
            </Paper>
        </div>
    );
};

export default UpdateStatusComponentV2;

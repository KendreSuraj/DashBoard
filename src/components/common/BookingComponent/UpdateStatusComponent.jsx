// UpdateStatusComponent.js
import React, { useEffect, useState } from 'react';
import { Paper, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { hasAdminAndSuperAdminAccess } from '../UserRolesConfig';

const UpdateStatusComponent = (props) => {
    const role = JSON.parse(localStorage.getItem('userData'))?.user?.role;
    const [selectedStatus, setSelectedStatus] = useState("");
    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedStatus.length < 1) {
            alert("Please select a status")
            return
        }

        props.updateStatusHandler(selectedStatus)


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
                            <MenuItem value="PENDING">PENDING</MenuItem>
                            <MenuItem value="COMPLETED">COMPLETED</MenuItem>
                            <MenuItem value="SCHEDULED">SCHEDULED</MenuItem>
                            <MenuItem value="CANCELLED">CANCELLED</MenuItem>
                            <MenuItem value="POSTPONED">POSTPONED</MenuItem>
                            <MenuItem value="PAID">PAID</MenuItem>
                            <MenuItem value="SESSION_START">SESSION_START</MenuItem>
                            <MenuItem value="SESSION_END">SESSION_END</MenuItem>
                        </Select>
                    </FormControl>
                   {hasAdminAndSuperAdminAccess(role)&& <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>}
                </form>
            </Paper>
        </div>
    );
};

export default UpdateStatusComponent;

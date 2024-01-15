// UpdateStatusComponent.js
import React, { useState } from 'react';
import { Grid, Paper, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const UpdateStatusComponent = ({ updateStatusHandler }) => {
    const [selectedStatus, setSelectedStatus] = useState('');
    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedStatus.length < 1) {
            alert("Please select a status")
            return
        }

        updateStatusHandler(selectedStatus)


    };
    return (
        <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Change Status</h2>
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
                    <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                </form>
            </Paper>
        </Grid>
    );
};

export default UpdateStatusComponent;

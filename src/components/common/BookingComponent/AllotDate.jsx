import React, { useState } from 'react';
import { Paper, TextField, Button, MenuItem } from '@mui/material';
import moment from 'moment';
import { getHoursList, getMinutesList } from '../../../utils';
import { hasAdminAndSuperAdminAccess } from '../UserRolesConfig';

const AllotDate = (props) => {
    const role = JSON.parse(localStorage.getItem('userData'))?.user?.role;
    const [selectedDate, setSelectedDate] = useState(props.startDate);
    const [startTime, setStartTime] = useState({
        hour: '',
        minute: '',
        ampm: '',
    });
    const hours = getHoursList();
    const minutes = getMinutesList();

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleStartTimeChange = (field, value) => {
        setStartTime((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!selectedDate) {
            alert("Please select appointment date.")
            return
        }

        if (!startTime.hour || !startTime.minute || !startTime.ampm) {
            alert("Please select appointment time.")
            return
        }
        const time = moment(`${startTime.hour}:${startTime.minute} ${startTime.ampm}`, 'hh:mm A').format('HH:mm:ss');

        props.handleAllotDate(`${selectedDate} ${time}`)

    };

    return (
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <form onSubmit={handleSubmit}>
                <h1>Appointment Date</h1>
                <TextField
                    label="Date"
                    type="date"
                    fullWidth
                    margin="normal"
                    value={selectedDate}
                    onChange={handleDateChange}
                    disabled={props.isDisabled}
                    required
                />
                <div style={{ marginBottom: '16px' }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '8px',
                        }}
                    >
                        <TextField
                            select
                            label="Hour"
                            style={{ width: '30%' }}
                            margin="normal"
                            value={startTime.hour}
                            onChange={(e) => handleStartTimeChange('hour', e.target.value)}
                            disabled={props.isDisabled}
                            required
                        >
                            {hours
                                ? hours.map((hour) => (
                                    <MenuItem key={hour} value={hour}>
                                        {hour}
                                    </MenuItem>
                                ))
                                : ''}

                            {/* ... add other hours ... */}
                        </TextField>

                        <TextField
                            select
                            label="Minute"
                            style={{ width: '30%' }}
                            margin="normal"
                            value={startTime.minute}
                            onChange={(e) =>
                                handleStartTimeChange('minute', e.target.value)
                            }
                            disabled={props.isDisabled}
                            required
                        >
                            {minutes
                                ? minutes.map((minute) => (
                                    <MenuItem key={minute} value={minute}>
                                        {minute}
                                    </MenuItem>
                                ))
                                : ''}
                            {/* ... add other minutes ... */}
                        </TextField>

                        <TextField
                            select
                            label="AM/PM"
                            style={{ width: '30%' }}
                            margin="normal"
                            value={startTime.ampm}
                            onChange={(e) => handleStartTimeChange('ampm', e.target.value)}
                            disabled={props.isDisabled}
                            required
                        >
                            <MenuItem value="AM">AM</MenuItem>
                            <MenuItem value="PM">PM</MenuItem>
                        </TextField>
                    </div>
                </div>
               {hasAdminAndSuperAdminAccess(role)&& <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={props.isDisabled}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>}
            </form>
        </Paper>
    );
};

export default AllotDate;

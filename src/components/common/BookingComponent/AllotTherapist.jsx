import React, { useEffect, useState } from 'react';
import { Paper, TextField, Button, MenuItem } from '@mui/material';
import axios from 'axios';
import { getToken } from '../userLocalStorageUtils';
import { getHoursList } from '../../../utils';
import { getMinutesList } from '../../../utils';

const AllotTherapistBox = (props) => {

    const [partners, setPartners] = useState([]);
    const [selectedTherapist, setSelectedTherapist] = useState('');
    const [selectedDate, setSelectedDate] = useState(props.startDate);
    const [startTime, setStartTime] = useState({ hour: "", minute: "", ampm: "" });
    const [endTime, setEndTime] = useState({ hour: "", minute: "", ampm: "" });
    const { handleAllotTherapist } = props
    const hours = getHoursList()
    const minutes = getMinutesList()

    useEffect(() => {
        setSelectedDate(props.startDate);
        setStartTime(props.startTime)
        setEndTime(props.endTime)
        setSelectedTherapist(props.partnerNameStr)
        axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/partner/list`,
            {
                headers: {
                    Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
                    token: getToken(),
                },
            })
            .then(response => {
                const partnerList = response.data && response.data.partnerList ? response.data.partnerList : [];
                setPartners(partnerList);
            });
    }, [props.startDate, props.endTime, props.startTime]);

    const handleTherapistChange = (event) => {
        setSelectedTherapist(event.target.value);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleStartTimeChange = (field, value) => {
        setStartTime(prevState => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleEndTimeChange = (field, value) => {
        setEndTime(prevState => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Form validation
        if (!selectedTherapist || !selectedDate || !startTime.hour || !startTime.minute || !startTime.ampm || !endTime.hour || !endTime.minute || !endTime.ampm) {
            // Handle validation error (e.g., show an error message)
            alert("please fill all the fields.")
            return;
        }
        const id = selectedTherapist.split("-")[0].trim();

        handleAllotTherapist({
            selectedTherapist: id, selectedDate, startTime, endTime
        });
    };


    return (
        <div >
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                <h3>Allot Therapist</h3>
                <form >
                    {/* Dropdown list */}
                    <TextField
                        select
                        label="Therapist"
                        fullWidth
                        margin="normal"
                        value={selectedTherapist}
                        onChange={handleTherapistChange}    
                        disabled={props.isDisabled}
                        required
                    >
                        {
                            partners && partners.length > 0 ? partners.map(partner => (
                                <MenuItem value={`${partner.partner_id} - ${partner.name}`} key={partner.partner_id}>{partner.partner_id} - {partner.name}</MenuItem>
                            )) : <MenuItem value="value" >Enter</MenuItem>
                        }
                    </TextField>

                    {/* Date picker */}
                    <h5>Select Date</h5>
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

                    {/* Start Time */}
                    <div style={{ marginBottom: '16px' }}>
                        <h5>Start Time</h5>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
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
                                {
                                    hours ? hours.map(hour => <MenuItem key={hour} value={hour}>{hour}</MenuItem>) : ""
                                }

                                {/* ... add other hours ... */}
                            </TextField>

                            <TextField
                                select
                                label="Minute"
                                style={{ width: '30%' }}
                                margin="normal"
                                value={startTime.minute}
                                onChange={(e) => handleStartTimeChange('minute', e.target.value)}
                                disabled={props.isDisabled}
                                required
                            >
                                {
                                    minutes ? minutes.map(minute => <MenuItem key={minute} value={minute}>{minute}</MenuItem>) : ""
                                }
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

                    {/* End Time */}
                    <div style={{ marginBottom: '16px' }}>
                        <h5>End Time</h5>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <TextField
                                select
                                label="Hour"
                                style={{ width: '30%' }}
                                margin="normal"
                                value={endTime.hour}
                                onChange={(e) => handleEndTimeChange('hour', e.target.value)}
                                disabled={props.isDisabled}
                                required
                            >
                                {
                                    hours ? hours.map(hour => <MenuItem key={hour} value={hour}>{hour}</MenuItem>) : ""
                                }
                                {/* ... add other hours ... */}
                            </TextField>

                            <TextField
                                select
                                label="Minute"
                                style={{ width: '30%' }}
                                margin="normal"
                                value={endTime.minute}
                                onChange={(e) => handleEndTimeChange('minute', e.target.value)}
                                disabled={props.isDisabled}
                                required
                            >
                                {
                                    minutes ? minutes.map(minute => <MenuItem key={minute} value={minute}>{minute}</MenuItem>) : ""
                                }
                                {/* ... add other minutes ... */}
                            </TextField>

                            <TextField
                                select
                                label="AM/PM"
                                style={{ width: '30%' }}
                                margin="normal"
                                value={endTime.ampm}
                                onChange={(e) => handleEndTimeChange('ampm', e.target.value)}
                                disabled={props.isDisabled}
                                required
                            >
                                <MenuItem value="AM">AM</MenuItem>
                                <MenuItem value="PM">PM</MenuItem>
                            </TextField>
                        </div>
                    </div>

                    <Button variant="contained" color="primary" type="submit" onClick={handleSubmit} disabled={props.isDisabled}>
                        Submit
                    </Button>
                </form>
            </Paper>
        </div>
    );
};

export default AllotTherapistBox;

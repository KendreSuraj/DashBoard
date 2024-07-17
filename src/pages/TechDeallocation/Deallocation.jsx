import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, List, ListItem, Typography, Container, Box } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';

const Deallocation = () => {
    const [sessionScheduleId, setSessionScheduleId] = useState('');
    const [therapistList, setTherapistList] = useState([]);

    const handleInputChange = (e) => {
        setSessionScheduleId(e.target.value);
    };

    const handleFetchTherapists = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SCHEDULER_API_URL}/api/v1/allocate/get-all-allocate-therapist-list/${sessionScheduleId}`);
            setTherapistList(response?.data?.list);
            toast.success(response?.data?.status?.message);
        } catch (err) {
            setTherapistList([]);
            toast.error(err?.response?.data?.status?.message || 'An error occurred while fetching therapists.');
        }
    };

    const handleDeallocateTherapists = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SCHEDULER_API_URL}/api/v1/allocate/deallocate-all-from-schedule`, { sessionScheduleId });
            setTherapistList([]);
            setSessionScheduleId('');
            toast.success(response?.data?.status?.message);
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.status?.message || 'An error occurred while deallocating.');
        }
    };

    return (
        <>
            <Container>
                <Box my={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Deallocation
                    </Typography>
                    <TextField
                        label="Session Schedule ID"
                        type="number"
                        value={sessionScheduleId}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handleFetchTherapists} fullWidth>
                        Fetch Therapist List
                    </Button>
                    {therapistList.length > 0 ? (
                        <Box my={2}>
                            <List>
                                {therapistList.map((therapist, index) => (
                                    <ListItem key={index}>
                                        {therapist.partnerId} {therapist.partnerName} -
                                        <Typography variant="caption" component="span">
                                            {therapist.type === 'ANALYTIC' ? 'B' : 'O'}
                                        </Typography>
                                    </ListItem>
                                ))}
                            </List>
                            <Button variant="contained" color="secondary" onClick={handleDeallocateTherapists} fullWidth>
                                Deallocate All
                            </Button>
                        </Box>
                    ) : (
                        <Typography variant="body1" gutterBottom>
                            No therapists to display.
                        </Typography>
                    )}
                </Box>
            </Container>
            <ToastContainer />
        </>
    );
};

export default Deallocation;

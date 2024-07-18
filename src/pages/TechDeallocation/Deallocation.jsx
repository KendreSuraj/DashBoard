import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, List, ListItem, Typography, Container, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';

const Deallocation = () => {
    const [sessionScheduleId, setSessionScheduleId] = useState('');
    const [therapistList, setTherapistList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleInputChange = (e) => {
        setSessionScheduleId(e.target.value);
    };

    const handleFetchTherapists = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_SCHEDULER_API_URL}/api/v1/allocate/get-all-allocate-therapist-list/${sessionScheduleId}`);
            setTherapistList(response?.data?.list);
            toast.success(response?.data?.status?.message);
        } catch (err) {
            setTherapistList([]);
            toast.error(err?.response?.data?.status?.message || 'An error occurred while fetching therapists.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeallocateTherapists = async () => {
        setLoading(true);
        setConfirmOpen(false);
        try {
            const response = await axios.post(`${process.env.REACT_APP_SCHEDULER_API_URL}/api/v1/allocate/deallocate-all-from-schedule`, { sessionScheduleId });
            setTherapistList([]);
            setSessionScheduleId('');
            toast.success(response?.data?.status?.message);
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.status?.message || 'An error occurred while deallocating.');
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmOpen = () => {
        setConfirmOpen(true);
    };

    const handleConfirmClose = () => {
        setConfirmOpen(false);
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
                        disabled={loading}
                    />
                    <Button variant="contained" color="primary" onClick={handleFetchTherapists} fullWidth disabled={loading}>
                        {loading ? 'Fetching...' : 'Fetch Therapist List'}
                    </Button>
                    {therapistList.length > 0 ? (
                        <Box my={2}>
                            <List>
                                {therapistList.map((therapist, index) => (
                                    <ListItem key={index}>
                                        {therapist.partnerId} {therapist.partnerName} - {therapist.type === 'ANALYTIC' ? 'B' : 'O'}
                                    </ListItem>
                                ))}
                            </List>
                            <Button variant="contained" color="secondary" onClick={handleConfirmOpen} fullWidth disabled={loading}>
                                {loading ? 'Deallocating...' : 'Deallocate All'}
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
            <Dialog open={confirmOpen} onClose={handleConfirmClose}>
                <DialogTitle>Confirm Deallocation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to deallocate all therapists from this session schedule?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmClose} color="primary" disabled={loading}>
                        Cancel
                    </Button>
                    <Button onClick={handleDeallocateTherapists} color="secondary" disabled={loading}>
                        {loading ? 'Deallocating...' : 'Deallocate'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Deallocation;

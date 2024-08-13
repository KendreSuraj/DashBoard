import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, List, ListItem, Typography, Container, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';

const Deallocation = () => {
    const [sessionScheduleId, setSessionScheduleId] = useState('');
    const [therapistList, setTherapistList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [therapistId,setTherapistId]=useState()
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

    // const handleDeallocateTherapists = async () => {
    //     setLoading(true);
    //     setConfirmOpen(false);
    //     try {
    //         const response = await axios.post(`${process.env.REACT_APP_SCHEDULER_API_URL}/api/v1/allocate/deallocate-all-from-schedule`, { sessionScheduleId });
    //         setTherapistList([]);
    //         setSessionScheduleId('');
    //         toast.success(response?.data?.status?.message);
    //     } catch (err) {
    //         console.log(err);
    //         toast.error(err?.response?.data?.status?.message || 'An error occurred while deallocating.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    const handleDeallocateTherapists = async () => {
        setLoading(true);
        setConfirmOpen(false);
        const reqBody={
            sessionScheduleId:sessionScheduleId,
            type:"BUG",
            therapistId:parseInt(therapistId)
        }
        try {
            const response = await axios.post(`${process.env.REACT_APP_SCHEDULER_API_URL}/api/v1/allocate/deallocate-bug-therapist`,reqBody);
            setTherapistList([]);
            setSessionScheduleId(sessionScheduleId);
            setTherapistId('')
            toast.success(response?.data?.status?.message);
            handleFetchTherapists()
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.status?.message || 'An error occurred while deallocating.');
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmOpen = (id) => {
        setTherapistId(id)
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
                                    <ListItem key={index} sx={{ justifyContent: 'space-between', alignItems: 'center',borderBottom: '1px solid #ccc'}}>
                                        <Box sx={{ color: therapist.type === 'ANALYTIC' ?'red':'green' }}>
                                            {therapist.partnerId} {therapist.partnerName} - {therapist.type === 'ANALYTIC' ? 'B' : 'O'}
                                        </Box>
                                        {therapist.type === 'ANALYTIC'&&<button
                                            style={{
                                                display: "flex",
                                                color: "black",
                                                background: 'pink',
                                                borderRadius: '10px',
                                                justifyContent: 'center',
                                                padding: '5px 10px',
                                            }}
                                            onClick={()=>handleConfirmOpen(therapist.partnerId)}
                                            disabled={loading}
                                        >
                                            {loading ? 'Deallocating...' : 'Deallocate'}
                                        </button>}
                                    </ListItem>
                                ))}
                            </List>
                            {/* <Button variant="contained" color="secondary" onClick={handleConfirmOpen} fullWidth disabled={loading}>
                              {loading ? 'Deallocating...' : 'Deallocate All'}
                              </Button> */}
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
                        Are you sure you want to deallocate therapist from this session schedule?
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

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Box, List, ListItem, Typography } from '@mui/material';

const DuplicateBlockedId = () => {
    const [duplicateList, setDuplicateList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingMachine,setLoadingMachine]=useState(false)
    const [duplicateMachine,setDuplicateMachine]=useState([])

    const fetchDuplicateMachineListBlocked = async () => {
        setLoadingMachine(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_SCHEDULER_API_URL}/api/v1/allocate/get-all-duplicate-allocate-machine-list`);
            console.log("see response",response)
            setDuplicateMachine(response?.data?.duplicateMachineList || []);
        } catch (err) {
            setDuplicateMachine([]);
        } finally {
            setLoadingMachine(false);
        }
    };

    useEffect(() => {
        const fetchTherapistList = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_SCHEDULER_API_URL}/api/v1/allocate/get-all-duplicate-allocate-therapist-list`);
                setDuplicateList(response?.data?.duplicateTherapistList || []);
                toast.success(response?.data?.message || 'Therapist list fetched successfully');
            } catch (err) {
                setDuplicateList([]);
                toast.error('Failed to fetch therapist list');
            } finally {
                setLoading(false);
            }
        };

        fetchTherapistList();
        fetchDuplicateMachineListBlocked()
    }, []);

    return (
    <div>
        <Box my={2}>
            <Typography variant="h5" component="h3" mb={2} sx={{ fontWeight: 'bold', color: 'black' }}>
                All Duplicate Therapist Blocked Ids
            </Typography>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                    <Typography variant="h4" component="div">
                        Loading...
                    </Typography>
                </Box>
            ) : duplicateList.length > 0 ? (
                <List>
                    {duplicateList.map((therapist, index) => (
                        <ListItem
                            key={index}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottom: '1px solid #ccc',
                                py: 1,
                                px: 2,
                            }}
                        >
                            <Box sx={{ flex: 1, fontWeight: 'bold', color: 'black' }}>
                                {therapist.therapistId}
                            </Box>
                            <Box sx={{ flex: 2, fontWeight: 'bold', color: 'black' }}>
                                {therapist.therapistName}
                            </Box>
                            <Box sx={{ flex: 2, fontWeight: 'bold', color: 'black' }}>
                                {therapist.day}
                            </Box>
                            <Box sx={{ flex: 3, fontWeight: 'bold', color: 'black' }}>
                                Service ID: {therapist.sessionScheduleId}
                            </Box>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant="body1">No duplicate therapists found.</Typography>
            )}
        </Box>
                <Box my={2}>
                <Typography variant="h5" component="h3" mb={2} sx={{ fontWeight: 'bold', color: 'black' }}>
                    All Duplicate Machines Blocked Ids
                </Typography>
                {loadingMachine ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                        <Typography variant="h4" component="div">
                            Loading...
                        </Typography>
                    </Box>
                ) : duplicateMachine.length > 0 ? (
                    <List>
                        {duplicateMachine.map((therapist, index) => (
                            <ListItem
                                key={index}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderBottom: '1px solid #ccc',
                                    py: 1,
                                    px: 2,
                                }}
                            >
                                <Box sx={{ flex: 1, fontWeight: 'bold', color: 'black' }}>
                                    {therapist.machineId}
                                </Box>
                                <Box sx={{ flex: 2, fontWeight: 'bold', color: 'black' }}>
                                    {therapist.machineName}
                                </Box>
                                <Box sx={{ flex: 2, fontWeight: 'bold', color: 'black' }}>
                                    {therapist.day}
                                </Box>
                                <Box sx={{ flex: 3, fontWeight: 'bold', color: 'black' }}>
                                    Service ID: {therapist.sessionScheduleId}
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body1">No duplicate machines found.</Typography>
                )}
            </Box>
        </div>
    );
};

export default DuplicateBlockedId;

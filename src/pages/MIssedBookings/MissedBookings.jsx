import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MissedBookings() {
    const [missedBookings, setMissedBookings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/missed-bookings/bookings`)
            .then(res => setMissedBookings(res.data.bookings))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleViewBooking = (id) => {
        navigate(`/booking-details/${id}`);
    };

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Missed Bookings
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Client Name</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Product Name</TableCell>
                                <TableCell>City</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {missedBookings.map(booking => (
                                <TableRow key={booking.id}>
                                    <TableCell>{booking.id}</TableCell>
                                    <TableCell>{booking.clientName}</TableCell>
                                    <TableCell>{booking.phone}</TableCell>
                                    <TableCell>{booking.productName}</TableCell>
                                    <TableCell>{booking.city}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleViewBooking(booking.id)}
                                        >
                                            View Booking
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
}

export default MissedBookings;

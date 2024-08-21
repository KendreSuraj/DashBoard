import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../../components/common/userLocalStorageUtils';

function UpcomingBookings() {

    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/booking/fetch-advance-bookings`, {
                    headers: {
                        Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
                        token: getToken(),
                    }
                });
                setBookings(response.data.bookings);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, []);

    const handleViewBooking = (serviceId) => {
        navigate(`/booking-details/${serviceId}`);
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Upcoming Bookings
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Service ID</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Appointment At</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            bookings.map((booking, index) => (
                                <TableRow key={index}>
                                    <TableCell>{booking.serviceId}</TableCell>
                                    <TableCell>{booking.phone}</TableCell>
                                    <TableCell>{booking.name}</TableCell>
                                    <TableCell>{booking.gender}</TableCell>
                                    <TableCell>{booking.productName}</TableCell>
                                    {/* <TableCell>{new Date(booking.appointmentAt).toLocaleString()}</TableCell> */}
                                    <TableCell>
                                        {new Intl.DateTimeFormat('en-GB', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                            timeZone: 'UTC', // Adjust the time zone as needed
                                            hour12: false,
                                        }).format(new Date(booking.appointmentAt))}
                                    </TableCell>
                                    <TableCell>{booking.advanceBookingStatus}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={() => handleViewBooking(booking.serviceId)}>
                                            View Booking
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default UpcomingBookings;

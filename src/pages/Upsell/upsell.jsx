import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../../components/common/userLocalStorageUtils';

function Upsell() {

    const [coupons, setCoupons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/upsell/get-all-coupons`, {
                    headers: {
                        Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
                        token: getToken(),
                    }
                });
                setCoupons(response.data.coupons);
            } catch (error) {
                console.error('Error fetching coupons:', error);
            }
        };

        fetchCoupons();
    }, []);


    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Upsell Coupons
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Service ID</TableCell>
                            <TableCell>Therapist Name</TableCell>
                            <TableCell>Therapist Phone</TableCell>
                            <TableCell>Client Name</TableCell>
                            <TableCell>Client Phone</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Start Price</TableCell>
                            <TableCell>End Price</TableCell>
                            <TableCell>Discount</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            coupons && coupons.length > 0 ? coupons.map((coupon, index) => (
                                <TableRow key={index}>
                                    <TableCell>{coupon.serviceId}</TableCell>
                                    <TableCell>{coupon.partnerName}</TableCell>
                                    <TableCell>{coupon.partnerMobile}</TableCell>
                                    <TableCell>{coupon.clientName}</TableCell>
                                    <TableCell>{coupon.clientPhone}</TableCell>
                                    <TableCell>{coupon.productName}</TableCell>
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
                                        }).format(new Date(coupon.createdAt))}
                                    </TableCell>
                                    <TableCell>{coupon.minCartDiscount}</TableCell>
                                    <TableCell>{coupon.maxCartDiscount}</TableCell>
                                    <TableCell>{coupon.discount}</TableCell>
                                    <TableCell>{coupon.status}</TableCell>
                                </TableRow>
                            )) : <p>No Coupons</p>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Upsell;

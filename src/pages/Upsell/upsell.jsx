import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../../components/common/userLocalStorageUtils';
import moment from 'moment';

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

    // {
    //     "serviceId": 23760,
    //     "partnerName": "Meena",
    //     "partnerPhone": "8766284199",
    //     "clientName": "Sagar Paliwal",
    //     "clientPhone": "9808342867",
    //     "productName": "Arms Inch Loss",
    //     "status": "REDEEMED",
    //     "createdAt": "2024-09-02T14:26:15.000Z",
    //     "minCartDiscount": "10000",
    //     "maxCartDiscount": "15000",
    //     "discount": "10",
    //     "code": "AVT342867",
    //     "cartId": "c76cde08-c246-4ab1-becd-c7cbac029dc7",
    //     "remarks": "MyCoupon1",
    //     "amountPaid": "4000",
    //     "discountedPrice": "0",
    //     "orderId": "31bca7e4-a9e2-46f6-b95b-79d2969bb108",
    //     "payableAmount": "12575",
    //     "leftAmount": "12575",
    //     "products": "Full Legs Laser Hair Reduction - 3 female, "
    // },


    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Upsell Coupons
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Therapist ID</TableCell>
                            <TableCell>Therapist Name</TableCell>
                            <TableCell>Therapist Phone</TableCell>
                            <TableCell>Client ID</TableCell>
                            <TableCell>Client Name</TableCell>
                            <TableCell>Client Phone</TableCell>
                            <TableCell>Coupon Code</TableCell>
                            <TableCell>Expiry Status</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Start Price</TableCell>
                            <TableCell>End Price</TableCell>
                            <TableCell>Discount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Remarks</TableCell>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Payable Amount</TableCell>
                            <TableCell>Amount Paid</TableCell>
                            <TableCell>Left Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            coupons && coupons.length > 0 ? coupons.map((coupon, index) => (
                                <TableRow key={index}>
                                    <TableCell>{coupon.partnerId}</TableCell>
                                    <TableCell>{coupon.partnerName}</TableCell>
                                    <TableCell>{coupon.partnerPhone}</TableCell>
                                    <TableCell>{coupon.clientId}</TableCell>
                                    <TableCell>{coupon.clientName}</TableCell>
                                    <TableCell>{coupon.clientPhone}</TableCell>
                                    <TableCell>{coupon.code}</TableCell>
                                    <TableCell>{coupon.is_valid ? 'Not Expired' : 'Expired'}</TableCell>
                                    <TableCell>{coupon.products}</TableCell>
                                    {/* <TableCell>{new Date(booking.appointmentAt).toLocaleString()}</TableCell> */}
                                    <TableCell>
                                        {moment(coupon.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                                    </TableCell>
                                    <TableCell>{coupon.minCartDiscount}</TableCell>
                                    <TableCell>{coupon.maxCartDiscount}</TableCell>
                                    <TableCell>{coupon.discount}</TableCell>
                                    <TableCell>{coupon.status}</TableCell>
                                    <TableCell>{coupon.remarks}</TableCell>
                                    <TableCell>{coupon.orderId}</TableCell>
                                    <TableCell>{coupon.payableAmount}</TableCell>
                                    <TableCell>{coupon.amountPaid}</TableCell>
                                    <TableCell>{coupon.leftAmount}</TableCell>
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

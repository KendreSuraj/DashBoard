import React, { useEffect, useState } from 'react'
import { Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaymentHistory } from '../../../store/actions/booking.action';
import { hasAdminAndSuperAdminAccess } from '../UserRolesConfig';

const PaymentHistory = ({ sessionScheduleId, orderId }) => {
    const role = JSON.parse(localStorage.getItem('userData'))?.user?.role;
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const paymentHistory = useSelector((state) => state?.booking?.paymentHistory)
    useEffect(() => {
        dispatch(fetchPaymentHistory({ sessionScheduleId, orderId }))
    }, [sessionScheduleId, orderId]);
    const remainingAmount = paymentHistory.remainingAmount
    return (
        <div>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {hasAdminAndSuperAdminAccess(role) && <Button onClick={() => navigate("/add-booking-payment", { state: { sessionScheduleId, remainingAmount, orderId } })} style={{ color: '#FFFFFF', background: '#0C2294', borderRadius: '8px', textTransform: 'capitalize' }}>Add Payment</Button>}                </div> <h3>Payment History</h3>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ borderBottom: '1px solid black', marginRight: '50px', paddingBottom: '5px' }}>Total Amount: {paymentHistory.totalAmount}</h4>
                    <h4 style={{ borderBottom: '1px solid black', paddingBottom: '5px', marginRight: '50px' }}>Amount Paid: {paymentHistory.totalAmount - paymentHistory.remainingAmount}</h4>
                    <h4 style={{ borderBottom: '1px solid black', paddingBottom: '5px' }}>Amount Pending: {paymentHistory.remainingAmount}</h4>
                </div>
                <div className="table-container">
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Service Id</th>
                                <th>Paid Amount</th>
                                <th>Mode of Payment</th>
                                <th>Added Date</th>
                                <th>Added By</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentHistory?.sessionPayments?.length > 0 ? (
                                paymentHistory.sessionPayments.map((data) => (
                                    <tr key={data.id}>
                                        <td>{data.id}</td>
                                        <td>{data.sessionScheduleId}</td>
                                        <td>{data.paidAmount}</td>
                                        <td>{data.modeOfPayment}</td>
                                        <td>{new Date(data.createdAt).toLocaleDateString('en-GB')}</td>
                                        <td>{data.addedBy}</td>
                                        <td>
                                            <img
                                                className="view-unchecked-img"
                                                src={`${data.image}?w=100&h=100&fit=crop`}
                                                onClick={() => window.open(data.image, '_blank')}
                                                style={{ maxWidth: '100px', maxHeight: '100px', cursor: 'pointer' }}
                                                alt="img"
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', fontWeight: 'bold' }}>Payment Not Added</td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </Paper>
        </div>
    )
}

export default PaymentHistory
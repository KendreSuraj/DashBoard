import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCoupon, fetchCoupon } from '../../store/actions/couponsAction';
import TableComponent from '../../components/common/TableComponent/TableComponent';
import LoaderComponent from '../../components/common/LoaderComponent/LoaderComponent';
import moment from 'moment';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import ConfirmDialog from '../../components/common/Dialog/ConfirmDialog';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getTransactionHistory } from '../../store/actions/advancePayment.action';

const TransactionHistory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const params = useParams()

    let { transactionHistory } = useSelector((state) => {
        return state.advancePayments
    });


    useEffect(() => {
        if (!params.id) {
            navigate('/advance-payments')
        } else {
            dispatch(getTransactionHistory(params.id))
        }
    }, [])


    const handleGoBack = () => {
        navigate('/advance-payments')
    }


    return (
        <>
            <Button onClick={handleGoBack} style={{ backgroundColor: '#FFAC33', color: 'white' }}>Go Back</Button>
            <h3>Transaction History</h3>
            {
                transactionHistory && transactionHistory.length > 0 ? <>
                    <TableComponent
                        data={transactionHistory}
                    />
                </> : <>
                    No data available for this payment.
                </>
            }
        </>
    );
};

export default TransactionHistory;

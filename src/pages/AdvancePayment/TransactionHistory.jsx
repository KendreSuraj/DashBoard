import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { getTransactionHistory } from '../../store/actions/advancePayment.action';

const TransactionHistory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const { transactionHistory } = useSelector((state) => state.advancePayments);

    useEffect(() => {
        if (!params.id) {
            navigate('/advance-payments');
        } else {
            dispatch(getTransactionHistory(params.id));
        }
    }, [dispatch, navigate, params.id]);

    const handleGoBack = () => {
        navigate('/advance-payments');
    };

    return (
        <>
            <Button onClick={handleGoBack} style={{ backgroundColor: '#FFAC33', color: 'white' }}>
                Go Back
            </Button>
            <h3>Transaction History</h3>
            {transactionHistory && transactionHistory.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: '700' }}>Transaction ID</TableCell>
                                <TableCell align="right" style={{ fontWeight: '700' }}>Amount Selected</TableCell>
                                <TableCell align="right" style={{ fontWeight: '700' }}>Balance At Time</TableCell>
                                <TableCell align="right" style={{ fontWeight: '700' }}>Transaction Type</TableCell>
                                <TableCell align="right" style={{ fontWeight: '700' }}>Order ID</TableCell>
                                <TableCell align="right" style={{ fontWeight: '700' }}>Verified</TableCell>
                                <TableCell align="right" style={{ fontWeight: '700' }}>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactionHistory.map((transaction) => (
                                <TableRow
                                    key={transaction["Transaction ID"]}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        '& > *': { fontWeight: '400' },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {transaction["Transaction ID"]}
                                    </TableCell>
                                    <TableCell align="right">{transaction["Amount Selected"]}</TableCell>
                                    <TableCell align="right">{transaction["Balance At Time"]}</TableCell>
                                    <TableCell align="right">
                                        {transaction["Transaction Type"] === 'debit' ? (
                                            <span style={styles.debit}>
                                                {transaction["Transaction Type"]} <RemoveIcon style={{ marginLeft: '8px' }} />
                                            </span>
                                        ) : (
                                            <span style={styles.credit}>
                                                {transaction["Transaction Type"]} <AddIcon style={{ marginLeft: '8px' }} />
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell align="right">{transaction["Order ID"]}</TableCell>
                                    <TableCell align="right">{transaction["Verified"]}</TableCell>
                                    <TableCell align="right">{transaction["Date"]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <>No data available for this payment.</>
            )}
        </>
    );
};

const styles = {
    buttonBase: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '150px',
        height: '40px',
        padding: '4px 8px',
        borderRadius: '4px',
        color: 'white',
        fontWeight: '500',
        textTransform: 'capitalize',
    },
    debit: {
        backgroundColor: '#ff3333',
    },
    credit: {
        backgroundColor: '#85e085',
    }
};

styles.debit = { ...styles.buttonBase, ...styles.debit };
styles.credit = { ...styles.buttonBase, ...styles.credit };

export default TransactionHistory;

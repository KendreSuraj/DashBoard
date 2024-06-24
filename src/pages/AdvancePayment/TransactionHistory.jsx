import React, { useEffect, useState } from 'react';
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
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { getTransactionHistory } from '../../store/actions/advancePayment.action';
import axios from 'axios';
import { getToken } from '../../components/common/userLocalStorageUtils';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    outline: 'none',
};

const TransactionHistory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const { transactionHistory } = useSelector((state) => state.advancePayments);
    const [products, setProducts] = useState([]);
    const [isOrderIdClicked, setIsOrderIdClicked] = useState(false)

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

    const detailsOfOrder = async (e) => {
        const orderID = e.target.innerHTML;
        await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/product/product-detail/${orderID}`, {
            headers: {
                Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
                token: getToken(),
            },
        }).then(response => setProducts(response.data.productDetails))
        setIsOrderIdClicked(!isOrderIdClicked);
    }

    return (
        <>
            <Button onClick={handleGoBack} style={{ backgroundColor: '#FFAC33', color: 'white' }}>
                Go Back
            </Button>
            <h3>Transaction History</h3>
            {transactionHistory && transactionHistory.length > 0 ? (
                <><TableContainer component={Paper}>
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
                                    <TableCell align="right" sx={transaction["Order ID"] === "-" ? "" : { cursor: "pointer", textDecoration: "underline", color: "#1876D1" }} onClick={detailsOfOrder}>{transaction["Order ID"]}</TableCell>
                                    <TableCell align="right">{transaction["Verified"]}</TableCell>
                                    <TableCell align="right">{transaction["Date"]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                </>
            ) : (
                <>No data available for this payment.</>
            )}
            {isOrderIdClicked &&
                <Modal
                    open={isOrderIdClicked}
                    onClose={() => setIsOrderIdClicked(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>{products.map((item) =>
                        <div style={{border:"1px solid black", borderRadius:"4px", padding:"8px", marginBottom:"8px"}}>
                            <p>
                                <span style={{ fontWeight: "bold" }}>Name: </span>
                                <span>{item.product_id}. {item.name}</span>
                            </p>
                            <p>
                                <span style={{ fontWeight: "bold" }}>Gender: </span>
                                <span>{item.gender}</span>
                            </p>
                        </div>
                    )}</Box>
                </Modal>}
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

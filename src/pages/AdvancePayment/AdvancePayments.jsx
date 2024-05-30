import React, { useEffect, useState } from 'react';

import TableComponent from '../../components/common/TableComponent/TableComponent';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { getVerificationUser, listPayments } from '../../store/actions/advancePayment.action';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../../components/common/userLocalStorageUtils';
import PaymentOtpModal from './PaymentOtpModal';

const apiUrl = process.env.REACT_APP_API_URL;

const AdvancePayments = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [advancePaymentId, setAdvancePaymentId] = useState(null)
    const [verificationUserDetail, setVerificationUserDetail] = useState()
    const [isVerificationUser, setIsVerificationUser] = useState(false)
    // const [page, setPage] = useState(1);
    // const [paymentListLength, setPaymentListLength] = useState(0);

    let { paymentList, verificationUser } = useSelector((state) => {
        console.log(state)
        return state.advancePayments
    });
    useEffect(() => {
        if (verificationUser && verificationUser.isUser) {
            setIsVerificationUser(true)
            setVerificationUserDetail(verificationUser.user)
        }
    }, [])

    // useEffect(() => {
    //     if (paymentList && paymentList.length > 0) {
    //         setPaymentListLength(paymentList.length)
    //     }
    // }, [])


    const handleEdit = (e) => {
        localStorage.setItem('packageEdit', e.id);
        localStorage.setItem('packageDetail', 'edit');
        navigate('packagesteps')
    }

    // const handlePagination = (event) => {
    //     const pageNumber = parseInt(event.target.innerHTML.split("")[0], 10);
    //     setPage(pageNumber);
    // }

    const verifyPayment = (data) => {
        setAdvancePaymentId(data.id)
        setShowModal(true)
    }

    useEffect(() => {
        dispatch(listPayments());
        dispatch(getVerificationUser())
    }, [dispatch]);


    const handleDelete = async (data) => {
        try {
            if (!data.id) {
                alert("Could not find the ID", 400)
                return
            }
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/admin/advance-payment/delete-advance-payment/${data.id}`,
                {
                    headers: {
                        Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
                        token: getToken(),
                    },
                }
            )
            if (response?.status === 201 || response?.status === 200) {
                window.location.reload();
            }
        } catch (err) {
            alert(err?.response?.data?.status?.message);
        }


    };
    return (
        <div>
            <h3>Advance Payments</h3>
            <Button
                concentrixUservariant="contained"
                color="primary"
                style={{
                    margin: '10px',
                    backgroundColor: '#384456',
                    color: 'white',
                    transition: 'transform 0.3s,background-color 0.3s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                onClick={() => {
                    // navigate("/packages/packagesteps");
                    // localStorage.setItem('packageDetail', 'add');
                    navigate("/add-advance-payments")
                    console.log("BUTTON CLICKED")
                }}
            >
                Add Advance Payment
            </Button>

            {
                paymentList && paymentList.length > 0 ? <TableComponent
                    hiddenFields={['id', 'callerId', "productId", "partner_caller", 'image']}
                    data={paymentList}
                    deletePaymentButton={'Delete'}
                    deletePayment={handleDelete}
                    verifyPaymentButton={'Verify Payment'}
                    verifyPayment={verifyPayment}
                /> : <h3>No records added till now.</h3>
            }

            {/* <div style={{ marginTop: "20px", float: "right" }}>
                <Pagination
                    count={Math.ceil(paymentListLength / 5)}
                    color="primary"
                    onChange={handlePagination}
                />
            </div> */}
            {showModal && <PaymentOtpModal verificationUserDetail={verificationUserDetail} isVerificationUser={isVerificationUser} handleVerification={handleVerification} advancePaymentId={advancePaymentId} closeModal={() => setShowModal(false)} />}
        </div>
    );
}

export default AdvancePayments;

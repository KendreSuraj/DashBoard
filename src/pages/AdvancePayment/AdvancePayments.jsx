import React, { useEffect, useState } from 'react';

import TableComponent from '../../components/common/TableComponent/TableComponent';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { getVerificationUser, listPayments } from '../../store/actions/advancePayment.action';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../../components/common/userLocalStorageUtils';
import PaymentOtpModal from './PaymentOtpModal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        return state.advancePayments
    });
    useEffect(() => {
        if (verificationUser && verificationUser.isUser) {
            setIsVerificationUser(true)
            setVerificationUserDetail(verificationUser.user)
        }
    }, [verificationUser])


    const handleEdit = (e) => {
        localStorage.setItem('packageEdit', e.id);
        localStorage.setItem('packageDetail', 'edit');
        navigate('packagesteps')
    }

    const verifyPayment = async (data) => {
        setAdvancePaymentId(data.id)
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/admin/advance-payment/send-otp`,
                {
                    id: data.id
                },
                {
                    headers: {
                        Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
                        token: getToken(),
                    },
                }
            )

            if (response?.status === 201 || response?.status === 200) {
                toast.success('Otp sent successfully!');
                setShowModal(true)
            }
        } catch (err) {
            console.log("ERR: verifyPayment frontend", err)
        }
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
                toas
            }
        } catch (err) {
            alert(err?.response?.data?.status?.message);
        }


    };
    const handleVerification = async ({ id, code }) => {
        try {
            if (!id && !code) {
                toast("Please fill the OTP")
                return
            }
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/admin/advance-payment/verify-payment-otp`,
                {
                    id,
                    otp: code
                },
                {
                    headers: {
                        Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
                        token: getToken(),
                    },
                }
            )
            if (response?.status === 201 || response?.status === 200) {
                toast.success('Verified successfully.');
                setShowModal(false)
                window.location.reload()
            }
        } catch (err) {
            toast("Something went wrong")
            console.log(err)
        }


    }
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
                    verifyPaymentButton={'Verify'}
                    verifyPayment={verifyPayment}
                /> : <h3>No records added till now.</h3>
            }
            {showModal && <PaymentOtpModal verificationUserDetail={verificationUserDetail} isVerificationUser={isVerificationUser} handleVerification={handleVerification} advancePaymentId={advancePaymentId} closeModal={() => setShowModal(false)} />}
            <ToastContainer />
        </div>
    );
}

export default AdvancePayments;

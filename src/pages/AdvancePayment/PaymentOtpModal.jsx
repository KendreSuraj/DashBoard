import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const PaymentOtpModal = ({ closeModal, handleVerification, advancePaymentId, verificationUserDetail, isVerificationUser }) => {
    const [open, setOpen] = useState(false);
    const [code, setCode] = useState('');



    const handleClose = () => {
        closeModal();
        setOpen(false);
    };

    const handleSubmit = () => {
        // Handle the code submission logic here
        handleVerification({ code, id: advancePaymentId })
        setOpen(false);
        closeModal();
    };

    useEffect(() => {
        setOpen(true);
    }, []);

    return (
        <div>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                Open Modal
            </Button> */}
            <Dialog maxWidth="xs" fullWidth open={open} onClose={handleClose}>
                {
                    isVerificationUser ? <>
                        <DialogTitle>Enter 4-Digit Code sent to {verificationUserDetail.name} on {verificationUserDetail.phone}</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="code"
                                label="Code"
                                type="password"
                                fullWidth
                                variant="standard"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions sx={{ mb: "10px" }}>
                            <Button onClick={handleClose} >Cancel</Button>
                            <Button onClick={handleSubmit} style={{
                                marginRight: "10px",
                                color: "white",
                                background: '#007BFF',
                                cursor: 'pointer',
                            }}>Submit</Button>
                        </DialogActions>
                    </> : <><DialogTitle>There is no user to validate this, please ask admin to add one user for advance payment verification.</DialogTitle>
                        <DialogActions sx={{ mb: "10px" }}>
                            <Button onClick={handleClose} >Cancel</Button>
                        </DialogActions>
                    </>
                }

            </Dialog>
        </div>
    );
};

export default PaymentOtpModal;

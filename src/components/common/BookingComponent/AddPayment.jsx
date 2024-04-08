import React, { useState } from 'react';
import './AddPayment.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { addBookingPayment } from '../../../store/actions/booking.action';

const AddPayment = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const sessionScheduleId = location?.state?.sessionScheduleId
    const remainingAmount = location?.state?.remainingAmount
    const userData = JSON.parse(localStorage.getItem('userData')).user;
    const [formData, setFormData] = useState({
        paidAmount: '',
        modeOfPayment: '',
        image: '',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            const reader = new FileReader();
            const file = files[0];
            reader.onloadend = () => {
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const maxDimension = 1024;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxDimension) {
                            height *= maxDimension / width;
                            width = maxDimension;
                        }
                    } else {
                        if (height > maxDimension) {
                            width *= maxDimension / height;
                            height = maxDimension;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    const compressedDataURL = canvas.toDataURL(file.type);
                    setFormData({
                        ...formData,
                        image: compressedDataURL,
                    });
                };
            };
            reader.readAsDataURL(file);
        } else {
            // const parsedValue = name === 'paidAmount' ? +value : value;
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const reqBody =
        {
            addedBy: userData?.name,
            addedByUserId: parseInt(userData?.id),
            sessionScheduleId: parseInt(sessionScheduleId),
            paidAmount: parseInt(formData.paidAmount),
            modeOfPayment: formData.modeOfPayment,
            image: formData.image
        }
        try {
            const response = await addBookingPayment(reqBody);
            if (response?.status?.code === 200) {
                alert(response?.status?.message);
                navigate(`/booking-details/${sessionScheduleId}`);
            }
        } catch (err) {
            alert(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add-payment-container">
            <h2>Add Payment</h2>
            <form className="add-payment-form" onSubmit={handleSubmit}>
                <div className="add-payment-form-group">
                    <label className="add-payment-label" htmlFor="paidAmount">Paid Amount:</label>
                    <input
                        className="add-payment-input"
                        type="number"
                        name="paidAmount"
                        placeholder='Enter Paid Amount'
                        max={remainingAmount}
                        min={1}
                        value={formData.paidAmount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="add-payment-form-group">
                    <label className="add-payment-label" htmlFor="modeOfPayment">Payment Mode:</label>
                    <select
                        className="add-payment-select"
                        name="modeOfPayment"
                        value={formData.modeOfPayment}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Payment Mode</option>
                        <option value="Cash">Cash</option>
                        <option value="Razorpay credit card">Razorpay credit card</option>
                        <option value="Upi scanner">Upi scanner</option>
                        <option value="Razorpay link">Razorpay link</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className="add-payment-form-group">
                    <label className="add-payment-label" htmlFor="image">Image:</label>
                    <input
                        className="add-payment-input"
                        type="file"
                        id="image"
                        name="image"
                        // accept="image/*"
                        accept=".jpeg, .jpg, .png"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    className="add-payment-button"
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        background: isSubmitting ? 'gray' : '#007bff',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default AddPayment;

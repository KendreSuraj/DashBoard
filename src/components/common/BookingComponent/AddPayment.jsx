import React, { useState } from 'react';
import './AddPayment.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { addBookingPayment } from '../../../store/actions/booking.action';

const AddPayment = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const sessionScheduleId = location?.state?.sessionScheduleId
    const [formData, setFormData] = useState({
        sessionScheduleId: parseInt(sessionScheduleId),
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
                setFormData({
                    ...formData,
                    image: reader.result,
                });
            };
            reader.readAsDataURL(file);
        } else {
            const parsedValue = name === 'paidAmount' ? +value : value;
            setFormData({ ...formData, [name]: parsedValue });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await addBookingPayment(formData);
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
                        accept="image/*"
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* <button className="add-payment-button" type="submit" disabled={isSubmitting} style={{background:`${isSubmitting}?"white":"blue"`}}>Submit</button> */}
                <button
                    className="add-payment-button"
                    type="submit"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
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

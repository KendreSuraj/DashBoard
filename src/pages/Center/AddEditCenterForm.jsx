import React, { useState } from 'react';
import './AddCenterForm.css';
import { useLocation } from 'react-router-dom';

const AddEditCenterForm = () => {
    const location = useLocation()
    const data = location?.state?.data;
    console.log('Testing location ---- ', data)
    const [formData, setFormData] = useState({
        centerName: '',
        centerLocation: '',
        city: '',
        centerPhone: '',
        centerStartTime: '',
        centerEndTime: '',
        centerAdmin: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    console.log("see form data", formData)
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log(formData);
    };

    return (
        <div className="add-center-form">
               <h3>{data?"Update Center":"Add Center"}</h3>
            <form onSubmit={handleSubmit}>
            {/* <h3>{data?"Update Center":"Add Enter"}</h3> */}
               <div className="form-row">
                <div className="form-group">
                    <label htmlFor="centerName">Center Name</label>
                    <input type="text" id="centerName" name="centerName" value={formData.centerName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="centerLocation">Center Location</label>
                    <input type="text" id="centerLocation" name="centerLocation" value={formData.centerLocation} onChange={handleChange} required />
                </div>
                </div>
                <div className="form-row">
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <select id="city" name="city" value={formData.city} onChange={handleChange} required>
                        <option value="">Select City</option>
                        <option value="city1">City 1</option>
                        <option value="city2">City 2</option>
                        <option value="city3">City 3</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="centerPhone">Center Phone</label>
                    <input type="tel" id="centerPhone" name="centerPhone" value={formData.centerPhone} onChange={handleChange}
                        pattern="[0-9]{10}"
                        title="Please enter a 10-digit phone number"
                        required />
                </div>
                </div>
                <div className="form-row">
                <div className="form-group">
                    <label htmlFor="centerStartTime">Center Start Time</label>
                    <input type="time" id="centerStartTime" name="centerStartTime" value={formData.centerStartTime} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="centerEndTime">Center End Time</label>
                    <input type="time" id="centerEndTime" name="centerEndTime" value={formData.centerEndTime} onChange={handleChange} required />
                </div>
                </div>
                <div className="form-group">
                    <label htmlFor="centerAdmin">Center Admin</label>
                    <select id="centerAdmin" name="centerAdmin" value={formData.centerAdmin} onChange={handleChange} required>
                        <option value="">Select Admin</option>
                        <option value="admin1">Admin 1</option>
                        <option value="admin2">Admin 2</option>
                        <option value="admin3">Admin 3</option>
                    </select>
                </div>
                <button
                    className="add-edit-button"
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        background: isSubmitting ? 'gray' : '#007bff',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isSubmitting ? (data ? 'Updating...' : 'Submitting...') : (data ? 'Update' : 'Submit')}
                </button>
            </form>
        </div>
    );
}

export default AddEditCenterForm;

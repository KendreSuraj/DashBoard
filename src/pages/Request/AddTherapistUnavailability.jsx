
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addTherapistUnavailabilityAndLeave, fetchTherapist } from '../../store/actions/therapist.action';
import { useDispatch, useSelector } from 'react-redux';

const AddTherapistUnavailability = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    let therapistList = useSelector(state => state?.therapist?.therapistList?.therapists)
    const [formData, setFormData] = useState({
        therapistId: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        type: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    useEffect(() => {
        dispatch(fetchTherapist())
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const reqBody = formData.type === "LEAVE"
            ? {
                therapistId: parseInt(formData?.therapistId),
                startDate: formData.startDate,
                endDate: formData.endDate,
                type: formData.type,
            }
            : {
                therapistId: parseInt(formData?.therapistId),
                startDate: formData.startDate,
                type: formData.type,
                startTime: formData.startTime + ":00",
                endTime: formData.endTime + ":00",
            };
        const res = await addTherapistUnavailabilityAndLeave(reqBody);
        if (res?.status?.code === 200) {
            alert(res.status?.message)
            navigate("/allrequestlist")
        }
    }

    return (
        <div className="add-center-form">
            <h3>Add Unavailable/leave Request </h3>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="therapistId">Therapist</label>
                        <select id="therapistId" name="therapistId" value={formData.therapistId} onChange={handleChange} required>
                            <option value="">Select Therapist</option>
                            {therapistList?.map(therapist => (
                                <option key={therapist.id} value={therapist.id}>{therapist.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="type">Leave type</label>
                        <select name="type" value={formData.type} onChange={handleChange} required>
                            <option value="">Select type</option>
                            <option value="LEAVE">LEAVE</option>
                            <option value="UNAVAILABLE">UNAVAILABLE</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="startDate">Start Date</label>
                        <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} required />
                    </div>
                    {(!formData?.type === "UNAVAILABLE" || formData?.type === "LEAVE") && <div className="form-group">
                        <label htmlFor="endDate">End Date</label>
                        <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} min={formData.startDate} required />
                    </div>}
                </div>
                {formData?.type === "UNAVAILABLE" && <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="startTime">Start Time</label>
                        <input type="time" step="3600" id="startTime" name="startTime" value={formData.startTime} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endTime">End Time</label>
                        <input type="time" step="3600" id="endTime" name="endTime" value={formData.endTime} onChange={handleChange} required />
                    </div>
                </div>}
                <button
                    className="add-edit-button"
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
}

export default AddTherapistUnavailability;

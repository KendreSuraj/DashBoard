import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addMachineRequest } from '../../store/actions/machine.action';

const AddMachineRequest = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location?.state?.data;
    console.log("see data", data);

    const [formData, setFormData] = useState({
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
    console.log("se data----->>>>>", formData)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const reqBody = formData.type === "REPAIR"
            ? {
                machineId: data?.id,
                startDate: formData.startDate,
                endDate: formData.endDate,
                type: formData.type
            }
            : {
                machineId: data?.id,
                startDate: formData.startDate,
                type: formData.type,
                startTime: formData.startTime + ":00",
                endTime: formData.endTime + ":00",
            };

        const res = await addMachineRequest(reqBody);
        if (res?.status === 200) {
            alert(res.data.status?.message)
            navigate("/machinelist")
        }
    }

    return (
        <div className="add-center-form">
            <h3>Add Unavailable/leave Request</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="name">Machine Name</label>
                        <input type="text" id="name" name="machineName" value={data?.name} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="type">Leave type</label>
                        <select name="type" value={formData.type} onChange={handleChange} required>
                            <option value="">Select City</option>
                            <option value="REPAIR">REPAIR</option>
                            <option value="UNAVAILABLE">UNAVAILABLE</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="startDate">Start Date</label>
                        <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} required />
                    </div>
                    {(!formData?.type === "UNAVAILABLE" || formData?.type === "REPAIR") && <div className="form-group">
                        <label htmlFor="endDate">End Date</label>
                        <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} required />
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

export default AddMachineRequest;

import React, { useEffect, useState } from 'react';
import './AddCenterForm.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { UpdateCenter, addCenter, fetchAdmin, fetchCity } from '../../store/actions/center.action';
import { useDispatch, useSelector } from 'react-redux';

const AddEditCenterForm = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const dispatch = useDispatch()
    const cityList = useSelector(state => state.center?.cityList?.cities)
    const  adminList = useSelector(state => state.center?.adminList)
    const data = location?.state?.data?.data;
    const id = data?.Id;
    console.log('Testing center---data ---- ', data);
    useEffect(() => {
        dispatch(fetchCity())
        dispatch(fetchAdmin())
    }, [dispatch])
    const [formData, setFormData] = useState({
        name: '',
        cityId: '',
        phone: '',
        timings: {
            startTime: '',
            endTime: ''
        },
        adminUserId: '',
        adminName: '',
        adminPhone: '',
    });
    console.log("Hii----->>>>>", formData)

    useEffect(() => {
        if (data) {
            setFormData(prevData => ({
                ...prevData,
                name: data?.['center Name'],
                phone: data?.['Center Phone'],
                timings: {
                    startTime: data?.['Start Time'],
                    endTime: data?.['End Time']
                },
                adminUserId: data?.['Admin User Id'],
                adminName: data?.['Admin Name'],
                adminPhone: data?.['Admin Phone']
            }));
        }
    }, [data]);


    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "adminUserId") {
            const selectedAdmin = adminList.find(admin => admin.id === parseInt(value));
            if (selectedAdmin) {
                setFormData(prevData => ({
                    ...prevData,
                    adminUserId: value,
                    adminName: selectedAdmin.name,
                    adminPhone: selectedAdmin.phone
                }));
            } else {
                setFormData(prevData => ({
                    ...prevData,
                    adminUserId: value,
                    adminName: '',
                    adminPhone: ''
                }));
            }
        } else if (name === 'startTime' || name === 'endTime') {
            setFormData(prevData => ({
                ...prevData,
                timings: {
                    ...prevData.timings,
                    [name]: value
                }
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = data ? await UpdateCenter(id, formData) : await addCenter(formData);
            if (res?.status === 200) {
                alert(res?.data?.status?.message);
                navigate("/centerlist");
            } else if (res?.response?.data?.status?.code === 400) {
                alert(res?.response?.data?.status?.message);
            } else {
                alert("Unhandled response:", res);
            }
        } catch (error) {
            alert("An error occurred. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add-center-form">
            <h3>{data ? "Update Center" : "Add Center"}</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="name">Center Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Center Phone</label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                            pattern="[0-9]{10}"
                            title="Please enter a 10-digit phone number"
                            required />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="startTime">Center Start Time</label>
                        <input type="time" step="3600" id="startTime" name="startTime" value={formData.timings.startTime} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endTime">Center End Time</label>
                        <input type="time" step="3600" id="endTime" name="endTime" value={formData.timings.endTime} onChange={handleChange}

                            required />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="cityId">City</label>
                        <select id="cityId" name="cityId" value={formData.cityId} onChange={handleChange} required>
                            <option value="">Select City</option>
                            {cityList?.map(city => (
                                <option key={city.id} value={city.id}>{city.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="adminUserId">Center Admin</label>
                        <select id="adminUserId" name="adminUserId" value={formData.adminUserId} onChange={handleChange} required>
                            <option value="">Select Admin</option>
                            {adminList?.map(admin => (
                                <option key={admin.id} value={admin.id}>{admin.name}</option>
                            ))}
                        </select>
                    </div>

                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="adminName">Admin Name</label>
                        <input type="text" id="adminName" name="adminName" value={formData.adminName} onChange={handleChange} disabled />
                    </div>
                    <div className="form-group">
                        <label htmlFor="adminPhone">Admin Phone</label>
                        <input type="tel" id="adminPhone" name="adminPhone" value={formData.adminPhone} onChange={handleChange}
                            pattern="[0-9]{10}"
                            title="Please enter a 10-digit phone number"
                            disabled />
                    </div>
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

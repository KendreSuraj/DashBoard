import React, { useState } from 'react';
import './AddUser.style.css'; // Import the external CSS file
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../store/actions/users.action';

const AddUser = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmedPassword: '',
        role: '',
        status: true,
        name: '',
        phone: ''
    });
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === 'status' ? (value === 'true') : value;
        setFormData({ ...formData, [name]: newValue });
    };
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await addUser(formData);
            if (res?.status?.code === 201 || res?.status?.code === 200) {
                alert(res?.status?.message);
                navigate("/users")
            }
        } catch (err) {
            alert(err?.response?.data?.status?.message || 'An error occurred while adding user in.')
        }

    };
    return (
        <div className="form-container">
            <h3>Add User</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="form-group">
                        <label className="label">Name:</label>
                        <input className="input" type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <label className="label">Email:</label>
                    <input className="input" type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label className="label">Password:</label>
                    <input className="input" type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label className="label">Confirm Password:</label>
                    <input className="input" type="password" name="confirmedPassword" value={formData.confirmedPassword} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label className="label">Phone:</label>
                    <input className="input" type="number" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label className="label">Role:</label>
                    <select className="select" name="role" value={formData.role} onChange={handleChange} required>
                        <option value="">Select Role</option>
                        <option value="ADMIN">Admin</option>
                        <option value="SUPER ADMIN">Super Admin</option>
                        <option value="THERAPIST">Therapist</option>
                        <option value="CALLER">Caller</option>
                        <option value="TL">Tl</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="label" >Status:</label>
                    <select className="select" name="status" value={formData.status} onChange={handleChange} required>
                        <option value="">Select Status</option>
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                    </select>
                </div>
                <button className="button" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddUser;

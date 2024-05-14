import React, { useEffect, useState } from 'react';
import './AddEditPartnerForm.css';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useLocation } from 'react-router-dom';
import TableComponent from '../../components/common/TableComponent/TableComponent';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AddEditPartnerForm = () => {
    const location = useLocation()
    const data = location?.state?.data;
    const [formData, setFormData] = useState({
        empId: '',
        name: '',
        location: '',
        phone: '',
        center: '',
        product: [],
        email: '',
        isRockStar: true,
        gender:'',
        weekendOff: "",
        schedule: [
            { day: 'Monday', startTime: '', endTime: '' },
            { day: 'Tuesday', startTime: '', endTime: '' },
            { day: 'Wednesday', startTime: '', endTime: '' },
            { day: 'Thursday', startTime: '', endTime: '' },
            { day: 'Friday', startTime: '', endTime: '' },
            { day: 'Saturday', startTime: '', endTime: '' },
            { day: 'Sunday', startTime: '', endTime: '' },
        ]
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedSchedule = [...formData.schedule];
        updatedSchedule[index][name] = value;
        setFormData(prevData => ({
            ...prevData,
            schedule: updatedSchedule
        }));
    };
    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCopyTime = (e) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            const updatedSchedule = formData.schedule.map((item, index) => ({
                ...item,
                startTime: formData.schedule[0].startTime,
                endTime: formData.schedule[0].endTime
            }));
            setFormData(prevData => ({
                ...prevData,
                schedule: updatedSchedule
            }));
        } else {
            const updatedSchedule = formData.schedule.map((item, index) => ({
                ...item,
                startTime: '',
                endTime: ''
            }));
            setFormData(prevData => ({
                ...prevData,
                schedule: updatedSchedule
            }));
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    };
    useEffect(() => {
        setFormData({
            ...formData,
            name: data?.name,
            email: data?.email,
            phone: data?.phone,
        })
    }, [data])

    const data1 = [
        { title: "Product1" },
        { title: "Men" },
        { title: "Guys" },
        { title: "Hello" }
    ];
    const handleAutocompleteChange = (event, value) => {
        setFormData((prevData) => ({
            ...prevData,
            product: value.map(option => option.title),
        }));
    };

    return (
        <div className="add-edit-partner-form">
            <h3>{data?"Update Therapist":"Add Therapist"}</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="empId">Employee ID</label>
                        <input type="text" id="empId" name="empId" value={formData.empId} onChange={handleFieldChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleFieldChange} required />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input type="text" id="location" name="location" value={formData.location} onChange={handleFieldChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleFieldChange}
                            pattern="[0-9]{10}"
                            title="Please enter a 10-digit phone number"
                            required />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="center">Center</label>
                        <select id="center" name="center" value={formData.center} onChange={handleFieldChange} required>
                            <option value="">Select Center</option>
                            <option value="center1">Center 1</option>
                            <option value="center2">Center 2</option>
                            <option value="center3">Center 3</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleFieldChange} required />
                    </div>
                </div>
                {/* <div className="form-group">
                    <label htmlFor="product">Product</label>
                    <select id="product" name="product" value={formData.product} onChange={handleFieldChange} required>
                        <option value="">Select Product</option>
                        <option value="product1">Product 1</option>
                        <option value="product2">Product 2</option>
                        <option value="product3">Product 3</option>
                    </select>
                </div> */}
                <div>
                    <Typography id="modal-modal-description" sx={{ mb: 1 }}>
                      Choose Product
                    </Typography>
                    <Autocomplete
                        sx={{ width: '100%' }}
                        onChange={handleAutocompleteChange}
                        multiple
                        id="checkboxes-tags-demo"
                        options={data1}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.title}
                        renderOption={(props, option, { selected }) => (
                            <li {...props}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option.title}
                            </li>
                        )}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </div>
                <br/>
                <div class="rockstar">
                    <label for="female">Gender:</label>
                    <div class="radio-buttons" onChange={handleFieldChange}>
                        <input type="radio" name="gender" required value="yes" style={{width:"35px"}}/>&nbsp;&nbsp;
                        <label for="female">Female</label>
                    </div>
                    <div class="radio-buttons" onChange={handleFieldChange}>
                        <input type="radio" name="gender" required value="no"  style={{width:"35px"}}/>&nbsp;&nbsp;
                        <label for="male">Male</label>
                    </div>
                </div>
                <br/>
                <div class="rockstar">
                    <label for="yes">Is Rockstar:</label>
                    <div class="radio-buttons" onChange={handleFieldChange}>
                        <input type="radio" name="isRockStar" required value="yes" style={{width:"35px"}}/>&nbsp;&nbsp;
                        <label for="yes">Yes</label>
                    </div>
                    <div class="radio-buttons" onChange={handleFieldChange}>
                        <input type="radio" name="isRockStar" required value="no"  style={{width:"35px"}}/>&nbsp;&nbsp;
                        <label for="no">No</label>
                    </div>
                </div>
                <h3>Therapist Availability</h3>
                <div style={{ display: 'flex', float: "right", width: "150px" }}>
                    <label>Copy&nbsp;Time</label>
                    <input type='checkbox' onChange={handleCopyTime} />
                </div>
                <table className="schedule-table">
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Weekly Off</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.schedule.map((item, index) => (
                            <tr key={index}>
                                <td>{item.day}</td>
                                <td>
                                    <input
                                        type="time"
                                        step="36000"
                                        name="startTime"
                                        value={item.startTime}
                                        onChange={(e) => handleChange(e, index)}
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="time"
                                        step="3600"
                                        name="endTime"
                                        value={item.endTime}
                                        onChange={(e) => handleChange(e, index)}
                                        required
                                    />
                                </td>
                                <td>
                                    <input type="radio" name="weekendOff" value={item.day}  required onChange={handleFieldChange} 
                                      style={{height:"20px"}}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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

           {data&&<div>
            
                <h3>Therapist Previous Record</h3>
                <TableComponent data={data1}/>
            </div>}
        </div>
    );
}
export default AddEditPartnerForm;


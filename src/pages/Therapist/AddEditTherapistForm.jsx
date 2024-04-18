import React, { useEffect, useState } from 'react';
import './AddEditTherapist.css';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useLocation, useNavigate } from 'react-router-dom';
import TableComponent from '../../components/common/TableComponent/TableComponent';
import { addTherapist } from '../../store/actions/therapist.action';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductList } from '../../store/actions/booking.action';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AddEditTherapistForm = () => {
    const dispatch=useDispatch()
    const location = useLocation();
    const navigate=useNavigate()
    const productList = useSelector((state) => state.booking.productList);
    console.log("see product list---->>>",productList)
    useEffect(() => {
       dispatch(fetchProductList())
    }, [dispatch])
    const data = location?.state?.data;
    console.log('Testing location ---- ', data);
    const [formData, setFormData] = useState({
        employeeId: '',
        name: '',
        centerId: '5',
        phone: '',
        center: '',
        location: '',
        products: [1, 3, 5],
        email: '',
        isRockStar: true,
        gender: '',
        weekendOff: '',
        schedule: {
            Monday: { startTime: '', endTime: '' },
            Tuesday: { startTime: '', endTime: '' },
            Wednesday: { startTime: '', endTime: '' },
            Thursday: { startTime: '', endTime: '' },
            Friday: { startTime: '', endTime: '' },
            Saturday: { startTime: '', endTime: '' },
            Sunday: { startTime: '', endTime: '' },
        },
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e, day) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            schedule: {
                ...prevData.schedule,
                [day]: {
                    ...prevData.schedule[day],
                    [name]: value,
                },
            },
        }));
    };

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    

    const handleCopyTime = (e) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            const updatedSchedule = Object.keys(formData.schedule).reduce((acc, day) => {
                acc[day] = {
                    startTime: formData.schedule['Monday'].startTime,
                    endTime: formData.schedule['Monday'].endTime,
                };
                return acc;
            }, {});
            setFormData(prevData => ({
                ...prevData,
                schedule: updatedSchedule,
            }));
        } else {
            const updatedSchedule = Object.keys(formData.schedule).reduce((acc, day) => {
                acc[day] = { startTime: '', endTime: '' };
                return acc;
            }, {});
            setFormData(prevData => ({
                ...prevData,
                schedule: updatedSchedule,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const addBody = {
            name:formData?.name,
            centerId: formData.centerId || 2,
            employeeId: '112',
            centerId: '5',
            phone:formData?.phone,
            location: formData.location,
            products: [1, 3, 5],
            email:formData.email,
            isRockstar: true,
            gender: formData.gender,
            // weekendOff: formData.weekendOff,
            // uniqueMachineCode: formData.uniqueMachineCode,
            products: JSON.stringify([1, 2, 4]),
            mondayAvailability: {
                startTime: formData?.schedule?.Monday?.startTime,
                endTime: formData?.schedule?.Monday?.endTime
            },
            tuesdayAvailability: {
                startTime: formData?.schedule?.Tuesday?.startTime,
                endTime: formData?.schedule?.Tuesday?.endTime
            },
            wednesdayAvailability: {
                startTime: formData?.schedule?.Wednesday?.startTime,
                endTime: formData?.schedule?.Wednesday?.endTime
            },
            thursdayAvailability: {
                startTime: formData?.schedule?.Thursday?.startTime,
                endTime: formData?.schedule?.Thursday?.endTime
            },
            fridayAvailability: {
                startTime: formData?.schedule?.Friday?.startTime,
                endTime: formData?.schedule?.Friday?.endTime
            },
            saturdayAvailability: {
                startTime: formData?.schedule?.Saturday?.startTime,
                endTime: formData?.schedule?.Saturday?.endTime
            },
            sundayAvailability: {
                startTime: formData?.schedule?.Sunday?.startTime,
                endTime: formData?.schedule?.Sunday?.endTime
            },
        }
        console.log("see requ body---",addBody)
        const res = await addTherapist(addBody)
        if(res?.status===200){
            alert(res.data.status?.message)
            navigate("/therapistlist")
        }
        console.log("hi bro--->>>", res)
        console.log(formData);
    };
    console.log(formData);

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
    useEffect(() => {
        if (!data) return;
    
        const mapAvailability = dayAvailability =>
            dayAvailability?.map(slot => ({
                startTime: slot.startTime,
                endTime: slot.endTime
            }));
    
        const {
            employeeId,
            name,
            centerId,
            phone,
            center,
            location,
            products,
            email,
            isRockStar,
            gender,
            weekendOff,
            mondayAvailability,
            tuesdayAvailability,
            wednesdayAvailability,
            thursdayAvailability,
            fridayAvailability,
            saturdayAvailability,
            sundayAvailability
        } = data;
    
        setFormData(prevData => ({
            ...prevData,
            employeeId,
            name,
            centerId,
            phone,
            center,
            location,
            products,
            email,
            isRockStar,
            gender,
            weekendOff,
            schedule: {
                Monday: mapAvailability(mondayAvailability),
                Tuesday: mapAvailability(tuesdayAvailability),
                Wednesday: mapAvailability(wednesdayAvailability),
                Thursday: mapAvailability(thursdayAvailability),
                Friday: mapAvailability(fridayAvailability),
                Saturday: mapAvailability(saturdayAvailability),
                Sunday: mapAvailability(sundayAvailability)
            },
            mondayAvailability: mapAvailability(mondayAvailability),
            tuesdayAvailability: mapAvailability(tuesdayAvailability),
            wednesdayAvailability: mapAvailability(wednesdayAvailability),
            thursdayAvailability: mapAvailability(thursdayAvailability),
            fridayAvailability: mapAvailability(fridayAvailability),
            saturdayAvailability: mapAvailability(saturdayAvailability),
            sundayAvailability: mapAvailability(sundayAvailability)
        }));
    }, [data]);
    

    return (
        <div className="add-edit-partner-form">
            <h3>{data ? "Update Therapist" : "Add Therapist"}</h3>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="employeeId">Employee ID</label>
                    <input type="text" id="employeeId" name="employeeId" value={formData.employeeId} onChange={handleFieldChange} required />
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
                    options={productList}
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
            <br />
            <div class="rockstar">
                <label for="female">Gender:</label>
                <div class="radio-buttons" onChange={handleFieldChange}>
                    <input type="radio" name="gender" required value="Male" style={{ width: "35px" }} />&nbsp;&nbsp;
                    <label for="female">Female</label>
                </div>
                <div class="radio-buttons" onChange={handleFieldChange}>
                    <input type="radio" name="gender" required value="Female" style={{ width: "35px" }} />&nbsp;&nbsp;
                    <label for="male">Male</label>
                </div>
            </div>
            <br />
            <div class="rockstar">
                <label for="yes">Is Rockstar:</label>
                <div class="radio-buttons" onChange={handleFieldChange}>
                    <input type="radio" name="isRockStar" required value="yes" style={{ width: "35px" }} />&nbsp;&nbsp;
                    <label for="yes">Yes</label>
                </div>
                <div class="radio-buttons" onChange={handleFieldChange}>
                    <input type="radio" name="isRockStar" required value="no" style={{ width: "35px" }} />&nbsp;&nbsp;
                    <label for="no">No</label>
                </div>
            </div>
            <h3>Therapist Availability</h3>
            <div style={{ display: 'flex', float: "right", width: "150px" }}>
                <label>Copy&nbsp;Time</label>
                <input type='checkbox' onChange={handleCopyTime} />
            </div>
            <form onSubmit={handleSubmit}>
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
                        {Object.keys(formData.schedule).map((day, index) => (
                            <tr key={index}>
                                <td>{day}</td>
                                <td>
                                    <input
                                        type="time"
                                        step="3600"
                                        name="startTime"
                                        value={formData.schedule[day].startTime}
                                        onChange={(e) => handleChange(e, day)}
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="time"
                                        step="3600"
                                        name="endTime"
                                        value={formData.schedule[day].endTime}
                                        onChange={(e) => handleChange(e, day)}
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="radio"
                                        name="weekendOff"
                                        value={day}
                                        required
                                        onChange={handleFieldChange}
                                        style={{ height: "20px" }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    className="add-edit-button"
                    type="submit"
                    // disabled={isSubmitting}
                    style={{
                        background: isSubmitting ? 'gray' : '#007bff',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isSubmitting ? (data ? 'Updating...' : 'Submitting...') : (data ? 'Update' : 'Submit')}
                </button>
            </form>

            {data && <div>
                <h3>Therapist Previous Record</h3>
                <TableComponent data={data1} />
            </div>}
        </div>
    );
};

export default AddEditTherapistForm;

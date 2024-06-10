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
import { UpdateTherapist, addTherapist, fetchTherapistRecord } from '../../store/actions/therapist.action';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductList } from '../../store/actions/booking.action';
import { fetchCenter } from '../../store/actions/center.action';
import { fetchProducts } from '../../store/actions/machine.action';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AddEditTherapistForm = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const navigate = useNavigate()
    const data = location?.state?.data;
    const id = data?.id
    const centerList = useSelector(state => state.center?.centerList?.centers)
    const therapistRecord = useSelector(state => state?.therapist?.therapistRecord)
    const productList = useSelector((state) => state.machine?.productList);
    const formattedTherapistRecord = therapistRecord.map(({ startDate, endDate, ...rest }) => ({
        ...rest,
        startDate: new Date(startDate).toLocaleDateString('en-GB'),
        endDate: new Date(endDate).toLocaleDateString('en-GB')
    }));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selected, setSelected] = useState([]);
   
    const [formData, setFormData] = useState({
        employeeId: '',
        name: '',
        centerId: '',
        phone: '',
        center: '',
        location: '',
        products: [],
        email: '',
        isRockstar: false,
        gender: 'Female',
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
        if (name === "weekendOff") {
            setFormData(prevData => {
                const updatedSchedule = { ...prevData.schedule };
                const previousWeekendOff = Object.keys(updatedSchedule).find(day => updatedSchedule[day].startTime === 'WEEK_OFF' && updatedSchedule[day].endTime === 'WEEK_OFF');
                if (previousWeekendOff) {
                    updatedSchedule[previousWeekendOff] = { startTime: '', endTime: '' };
                }
                return {
                    ...prevData,
                    schedule: {
                        ...updatedSchedule,
                        [value]: { startTime: 'WEEK_OFF', endTime: 'WEEK_OFF' }
                    },
                    [name]: value
                };
            });
        } else {
            if (name === "gender") {
                setFormData({
                    ...formData,
                    products: []
                })
            }
            setFormData(prevData => ({
                ...prevData,
                [name]: value,
            }));
        }
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
        if (formData?.products.length <= 0) {
            alert("Please Add at least one Product");
            return;
        }
        setIsSubmitting(true);
        const isRockstarBoolean = formData.isRockstar === true || formData?.isRockstar === "yes";
        const addBody = {
            name: formData?.name,
            employeeId: formData.employeeId,
            centerId: parseInt(formData?.centerId),
            phone: formData?.phone,
            email: formData.email,
            isRockstar: isRockstarBoolean,
            gender: formData.gender,
            products: JSON.stringify(formData.products),
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

        const upadteBody = {
            name: formData?.name,
            employeeId: formData.employeeId,
            centerId: parseInt(formData.centerId),
            products: JSON.stringify(formData.products),
            isRockstar: isRockstarBoolean,
            gender: formData.gender,
            // mondayAvailability: {
            //     startTime: formData?.schedule?.Monday?.startTime,
            //     endTime: formData?.schedule?.Monday?.endTime
            // },
            // tuesdayAvailability: {
            //     startTime: formData?.schedule?.Tuesday?.startTime,
            //     endTime: formData?.schedule?.Tuesday?.endTime
            // },
            // wednesdayAvailability: {
            //     startTime: formData?.schedule?.Wednesday?.startTime,
            //     endTime: formData?.schedule?.Wednesday?.endTime
            // },
            // thursdayAvailability: {
            //     startTime: formData?.schedule?.Thursday?.startTime,
            //     endTime: formData?.schedule?.Thursday?.endTime
            // },
            // fridayAvailability: {
            //     startTime: formData?.schedule?.Friday?.startTime,
            //     endTime: formData?.schedule?.Friday?.endTime
            // },
            // saturdayAvailability: {
            //     startTime: formData?.schedule?.Saturday?.startTime,
            //     endTime: formData?.schedule?.Saturday?.endTime
            // },
            // sundayAvailability: {
            //     startTime: formData?.schedule?.Sunday?.startTime,
            //     endTime: formData?.schedule?.Sunday?.endTime
            // },
        }
        const res = data ? await UpdateTherapist(data?.id, upadteBody) : await addTherapist(addBody)
        if (res?.status === 200) {
            alert(res.data.status?.message)
            navigate("/therapistlist")
        }
    };

    const handleOption = () => {
        return productList.filter(item => item.gender === formData.gender.toLowerCase());
    };

    // const handleAutocompleteChange = (event, value) => {
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         products: value.map(option => option.id),
    //     }));
    // };
   

    function convertStringToArray(stringArray) {
        var cleanedString = stringArray.replace(/[^\d,]/g, '');    
        var array = cleanedString.split(',').map(function(item) {
            return parseInt(item.trim());
        });
    
        return array;
    }
    useEffect(() => {
        if (!data) return;
        const {
            employeeId,
            name,
            centerId,
            phone,
            center,
            location,
            products,
            email,
            isRockstar,
            gender,
            mondayAvailability,
            tuesdayAvailability,
            wednesdayAvailability,
            thursdayAvailability,
            fridayAvailability,
            saturdayAvailability,
            sundayAvailability
        } = data;
        console.log("hii pppp",products)
        setFormData(prevData => ({
            ...prevData,
            employeeId,
            name,
            centerId: parseInt(centerId),
            phone,
            center,
            // products: products?.replace(/'/g, '"'),
            products:convertStringToArray(products),
            email,
            isRockstar,
            gender,
            schedule: {
                Monday: {
                    startTime: mondayAvailability[0]?.startTime || "WEEK_OFF",
                    endTime: mondayAvailability[mondayAvailability.length - 1]?.endTime || "WEEK_OFF"
                },
                Tuesday: {
                    startTime: tuesdayAvailability[0]?.startTime || "WEEK_OFF",
                    endTime: tuesdayAvailability[tuesdayAvailability.length - 1]?.endTime || "WEEK_OFF"
                },
                Wednesday: {
                    startTime: wednesdayAvailability[0]?.startTime || "WEEK_OFF",
                    endTime: wednesdayAvailability[wednesdayAvailability.length - 1]?.endTime || "WEEK_OFF"
                },
                Thursday: {
                    startTime: thursdayAvailability[0]?.startTime || "WEEK_OFF",
                    endTime: thursdayAvailability[thursdayAvailability.length - 1]?.endTime || "WEEK_OFF"
                },
                Friday: {
                    startTime: fridayAvailability[0]?.startTime || "WEEK_OFF",
                    endTime: fridayAvailability[fridayAvailability.length - 1]?.endTime || "WEEK_OFF"
                },
                Saturday: {
                    startTime: saturdayAvailability[0]?.startTime || "WEEK_OFF",
                    endTime: saturdayAvailability[saturdayAvailability.length - 1]?.endTime || "WEEK_OFF"
                },
                Sunday: {
                    startTime: sundayAvailability[0]?.startTime || "WEEK_OFF",
                    endTime: sundayAvailability[sundayAvailability.length - 1]?.endTime || "WEEK_OFF"
                }
            },
        }))
    }, [data])

    const handleAutocompleteChange = (event, value) => {
        setSelected(value);
        setFormData(prevData => ({
            ...prevData,
            products: value.map(option => option.id),
        }));
    };


    useEffect(() => {
        if (id) {
            setSelected(productList.filter(item => formData.products.includes(item.id)));

        }
    }, [id, formData.products, productList]);


    useEffect(() => {
        dispatch(fetchProductList())
        dispatch(fetchCenter())
        dispatch(fetchTherapistRecord(data?.id))
        dispatch(fetchProducts())
    }, [dispatch, id])



    return (
        <div className="add-edit-partner-form">
            <h3>{data ? "Update Therapist" : "Add Therapist"}</h3>

            <form onSubmit={handleSubmit}>
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
                {!data && <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleFieldChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleFieldChange}
                            pattern="[0-9]{10}"
                            title="Please enter a 10-digit phone number"
                            required />
                    </div>
                </div>}
                <div className="form-row">
                    {/* <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input type="text" id="location" name="location" value={formData.location} onChange={handleFieldChange} required />
                    </div> */}
                    <div className="form-group">
                        <label htmlFor="centerId">Center</label>
                        <select id="centerId" name="centerId" value={formData.centerId} onChange={handleFieldChange} required>
                            <option value="">Select Center</option>
                            {centerList?.map(center => (
                                <option key={center.id} value={center.id}>{center.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div class="rockstar">
                    <label for="gender">Gender:</label>
                    <div class="radio-buttons" onChange={handleFieldChange}>
                        <input type="radio" name="gender" required value="Female" style={{ width: "35px" }} checked={formData.gender === "Female"} />&nbsp;&nbsp;
                        <label for="female">Female</label>
                    </div>
                    <div class="radio-buttons" onChange={handleFieldChange}>
                        <input type="radio" name="gender" required value="Male" style={{ width: "35px" }} checked={formData.gender === "Male"} />&nbsp;&nbsp;
                        <label for="male">Male</label>
                    </div>
                </div>
                <br />
                <div>
                    <label htmlFor="choose-product">Choose Product</label>
                    <Autocomplete
                        sx={{ width: '100%' }}
                        onChange={handleAutocompleteChange}
                        multiple
                        id="checkboxes-tags-demo"
                        options={productList?.filter((item => item.gender === formData.gender.toLocaleLowerCase()))}
                        value={selected}
                        // options={handleOption()}
                        disableCloseOnSelect
                        // getOptionLabel={(option) => option.name}
                        getOptionLabel={(option) => option.name + "-" + [option.gender]}
                        renderOption={(props, option, { selected }) => (
                            <li {...props}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option.name}-[{option['gender']}]
                                {/* {option.name} */}
                            </li>
                        )}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </div>
                <br />
                <div class="rockstar">
                    <label for="yes">Is Rockstar:</label>
                    <div class="radio-buttons" onChange={handleFieldChange}>
                        <input type="radio" name="isRockstar" required value="yes" style={{ width: "35px" }} checked={formData.isRockstar === true || formData?.isRockstar === "yes"} />&nbsp;&nbsp;
                        <label for="yes">Yes</label>
                    </div>
                    <div class="radio-buttons" onChange={handleFieldChange}>
                        <input type="radio" name="isRockstar" required value="no" style={{ width: "35px" }} checked={formData.isRockstar === false || formData?.isRockstar === "no"} />&nbsp;&nbsp;
                        <label for="no">No</label>
                    </div>
                </div>
                {/* <br/> */}
                {/* <div class="rockstar">
                    <label for="yes">Is Week Off:</label>
                    <div class="radio-buttons" onChange={handleFieldChange}>
                        <input type="radio" name="weekOff" required value="yes" style={{ width: "35px" }} checked={formData?.weekOff === "yes"} />&nbsp;&nbsp;
                        <label for="yes">Yes</label>
                    </div>
                    <div class="radio-buttons" onChange={handleFieldChange}>
                        <input type="radio" name="weekOff" required value="no" style={{ width: "35px" }} checked={formData?.weekOff === "no"} />&nbsp;&nbsp;
                        <label for="no">No</label>
                    </div>
                </div> */}
                <h3>Therapist Availability</h3>
                {<div style={{ display: 'flex', float: "right", width: "150px" }}>
                    <label title='First Choose Monday Time Slots for copy all Days'>Copy&nbsp;Time</label>
                    <input type='checkbox' title='First Choose Monday Time Slots for copy all Days' onChange={handleCopyTime}
                        disabled={!(formData?.schedule?.Monday.startTime && formData?.schedule?.Monday.endTime)}
                    />
                </div>}
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
                                        disabled={(id && formData.schedule[day].startTime === "WEEK_OFF") || (day === formData.weekendOff)}
                                        value={!(day === formData.weekendOff) && formData.schedule[day].startTime}
                                        onChange={(e) => handleChange(e, day)}
                                        // required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="time"
                                        step="3600"
                                        name="endTime"
                                        disabled={(id && formData.schedule[day].endTime === "WEEK_OFF") || (day === formData.weekendOff)}
                                        value={!(day === formData.weekendOff) && formData.schedule[day].endTime}
                                        onChange={(e) => handleChange(e, day)}
                                        required
                                    />
                                </td>
                               <td>
                                    <input
                                        checked={(id && formData.schedule[day].endTime === "WEEK_OFF") || (day === formData.weekendOff)}
                                        type="radio"
                                        name="weekendOff"
                                        value={day}
                                        // required
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
                    disabled={isSubmitting}
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
                <TableComponent data={formattedTherapistRecord} hiddenFields={["createdAt", "updatedAt", "extra", "deletedAt", "id"]} />
            </div>}
        </div>
    );
};

export default AddEditTherapistForm;

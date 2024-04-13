import React, { useState } from 'react';
import './AddEditMachineForm.css';
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

const AddEditMachineForm = () => {
    const location = useLocation()
    const data = location?.state?.data;
    console.log('Testing location ---- ', data)
    const [formData, setFormData] = useState({
        machineName: '',
        centerLocation: '',
        centerName: '',
        machineAvailability: [
            { day: 'Monday', startTime: '', endTime: '' },
            { day: 'Tuesday', startTime: '', endTime: '' },
            { day: 'Wednesday', startTime: '', endTime: '' },
            { day: 'Thursday', startTime: '', endTime: '' },
            { day: 'Friday', startTime: '', endTime: '' },
            { day: 'Saturday', startTime: '', endTime: '' },
            { day: 'Sunday', startTime: '', endTime: '' },
        ],
        productServiceable: []
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedAvailability = [...formData.machineAvailability];
        updatedAvailability[index][name] = value;
        setFormData((prevData) => ({
            ...prevData,
            machineAvailability: updatedAvailability,
        }));
    };

    const handleAutocompleteChange = (event, value) => {
        setFormData((prevData) => ({
            ...prevData,
            productServiceable: value.map(option => option.title),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log(formData);
    };

    const handleCopyTime = (e) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            const updatedmachineAvailability = formData.machineAvailability.map((item) => ({
                ...item,
                startTime: formData.machineAvailability[0].startTime,
                endTime: formData.machineAvailability[0].endTime,
            }));
            setFormData((prevData) => ({
                ...prevData,
                machineAvailability: updatedmachineAvailability,
            }));
        } else {
            const updatedmachineAvailability = formData.machineAvailability.map((item) => ({
                ...item,
                startTime: '',
                endTime: '',
            }));
            setFormData((prevData) => ({
                ...prevData,
                machineAvailability: updatedmachineAvailability,
            }));
        }
    };
    const data1 = [
        { title: "Anurag" },
        { title: "Praduman" },
        { title: "Vaibhav" },
        { title: "Ankit" }
    ];
    console.log("See this", formData)
    return (
        <div className="add-edit-machine-form">
            <h3>{data?"Update Machine":"Add Machine"}</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="machineName">Machine Name</label>
                        <input type="text" id="machineName" name="machineName" value={formData.machineName} onChange={(e) => setFormData({ ...formData, machineName: e.target.value })}
                            required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="centerName">Center</label>
                        <select id="centerName" name="centerName" value={formData.centerName} onChange={(e) => setFormData({ ...formData, centerName: e.target.value })} required>
                            <option value="">Select Admin</option>
                            <option value="admin1">Admin 1</option>
                            <option value="admin2">Admin 2</option>
                            <option value="admin3">Admin 3</option>
                        </select>
                    </div>
                </div>
                <div>
                    <Typography id="modal-modal-description" sx={{ mt: 4, mb: 1 }}>
                        Products serviceable
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

                <h3>Machine Availability</h3>
                <div style={{ display: 'flex', float: "right", width: "150px" }}>
                    <label>Copy&nbsp;Time</label>
                    <input type='checkbox' onChange={handleCopyTime} />
                </div>
                <br />
                <table className="machineAvailability-table">
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.machineAvailability.map((item, index) => (
                            <tr key={index}>
                                <td>{item.day}</td>
                                <td>
                                    <input
                                        type="time"
                                        step="3600"
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
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    }}
                >
                {isSubmitting ? (data ? 'Updating...' : 'Submitting...') : (data ? 'Update' : 'Submit')}
                </button>
            </form>
            {data&&<div>
                <h3>Machine Previous Record</h3>
                <TableComponent data={data1}/>
            </div>}
        </div>
    );
};

export default AddEditMachineForm;



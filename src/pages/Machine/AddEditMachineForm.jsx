import React, { useEffect, useState } from 'react';
import './AddEditMachineForm.css';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useLocation, useNavigate } from 'react-router-dom';
import TableComponent from '../../components/common/TableComponent/TableComponent';
import { UpdateMachine, addMachine } from '../../store/actions/machine.action';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCenter } from '../../store/actions/center.action';
import { fetchProductList } from '../../store/actions/booking.action';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AddEditMachineForm = () => {
    const dispatch = useDispatch()
    let centerList = useSelector(state => state.center?.centerList?.centers)
    const productList = useSelector((state) => state.booking.productList);
    useEffect(() => {
        dispatch(fetchCenter())
        dispatch(fetchProductList());
    }, [dispatch])

    const navigate = useNavigate()
    const location = useLocation();
    const data = location?.state?.data;
    console.log("Hii data---->>>>", data)
    const [formData, setFormData] = useState({
        name: '',
        centerId: '',
        uniqueMachineCode: '',
        machineAvailability: {
            Monday: { startTime: '', endTime: '' },
            Tuesday: { startTime: '', endTime: '' },
            Wednesday: { startTime: '', endTime: '' },
            Thursday: { startTime: '', endTime: '' },
            Friday: { startTime: '', endTime: '' },
            Saturday: { startTime: '', endTime: '' },
            Sunday: { startTime: '', endTime: '' },
        },
        products: [],
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e, day) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            machineAvailability: {
                ...prevData.machineAvailability,
                [day]: {
                    ...prevData.machineAvailability[day],
                    [name]: value
                }
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const addBody = {
            name: formData.name,
            centerId: formData.centerId,
            uniqueMachineCode: formData.uniqueMachineCode,
            products: JSON.stringify(formData.products),
            // machineAvailability: formData.machineAvailability,
            mondayAvailability: {
                startTime: formData?.machineAvailability?.Monday?.startTime,
                endTime: formData?.machineAvailability?.Monday?.endTime
            },
            tuesdayAvailability: {
                startTime: formData?.machineAvailability?.Tuesday?.startTime,
                endTime: formData?.machineAvailability?.Tuesday?.endTime
            },
            wednesdayAvailability: {
                startTime: formData?.machineAvailability?.Wednesday?.startTime,
                endTime: formData?.machineAvailability?.Wednesday?.endTime
            },
            thursdayAvailability: {
                startTime: formData?.machineAvailability?.Thursday?.startTime,
                endTime: formData?.machineAvailability?.Thursday?.endTime
            },
            fridayAvailability: {
                startTime: formData?.machineAvailability?.Friday?.startTime,
                endTime: formData?.machineAvailability?.Friday?.endTime
            },
            saturdayAvailability: {
                startTime: formData?.machineAvailability?.Saturday?.startTime,
                endTime: formData?.machineAvailability?.Saturday?.endTime
            },
            sundayAvailability: {
                startTime: formData?.machineAvailability?.Sunday?.startTime,
                endTime: formData?.machineAvailability?.Sunday?.endTime
            },
        };
        const updateBody = {
            name: formData.name,
            centerId: formData.centerId,
            products: JSON.stringify(formData.products),
            // machineAvailability: formData.machineAvailability,
            mondayAvailability: {
                startTime: formData?.machineAvailability?.Monday?.startTime,
                endTime: formData?.machineAvailability?.Monday?.endTime
            },
            tuesdayAvailability: {
                startTime: formData?.machineAvailability?.Tuesday?.startTime,
                endTime: formData?.machineAvailability?.Tuesday?.endTime
            },
            wednesdayAvailability: {
                startTime: formData?.machineAvailability?.Wednesday?.startTime,
                endTime: formData?.machineAvailability?.Wednesday?.endTime
            },
            thursdayAvailability: {
                startTime: formData?.machineAvailability?.Thursday?.startTime,
                endTime: formData?.machineAvailability?.Thursday?.endTime
            },
            fridayAvailability: {
                startTime: formData?.machineAvailability?.Friday?.startTime,
                endTime: formData?.machineAvailability?.Friday?.endTime
            },
            saturdayAvailability: {
                startTime: formData?.machineAvailability?.Saturday?.startTime,
                endTime: formData?.machineAvailability?.Saturday?.endTime
            },
            sundayAvailability: {
                startTime: formData?.machineAvailability?.Sunday?.startTime,
                endTime: formData?.machineAvailability?.Sunday?.endTime
            },
        };
        // console.log(formData);
        const res = data ? await UpdateMachine(data?.id,updateBody) : await addMachine(addBody);
        if (res?.status === 200) {
            alert(res.data.status?.message)
            navigate("/machinelist")
        }
    };

    const handleAutocompleteChange = (event, value) => {
        console.log("see value---???",value)
        setFormData(prevData => ({
            ...prevData,
            products: value.map(option => option.title),
        }));
    };

    // useEffect(() => {
    //     if (!data) return;

    //     const mapAvailability = dayAvailability =>
    //         dayAvailability.map(slot => ({
    //             startTime: slot.startTime,
    //             endTime: slot.endTime
    //         }));

    //     const {
    //         name,
    //         centerId = 1,
    //         uniqueMachineCode,
    //         mondayAvailability,
    //         tuesdayAvailability,
    //         wednesdayAvailability,
    //         thursdayAvailability,
    //         fridayAvailability,
    //         saturdayAvailability,
    //         sundayAvailability
    //     } = data;

    //     setFormData(prevData => ({
    //         ...prevData,
    //         name,
    //         centerId,
    //         uniqueMachineCode,
    //         machineAvailability: mapAvailability(mondayAvailability),
    //         mondayAvailability: mapAvailability(mondayAvailability),
    //         tuesdayAvailability: mapAvailability(tuesdayAvailability),
    //         wednesdayAvailability: mapAvailability(wednesdayAvailability),
    //         thursdayAvailability: mapAvailability(thursdayAvailability),
    //         fridayAvailability: mapAvailability(fridayAvailability),
    //         saturdayAvailability: mapAvailability(saturdayAvailability),
    //         sundayAvailability: mapAvailability(sundayAvailability)
    //     }));
    // }, [data]);


    useEffect(() => {
        if (!data) return;
    
        const mapAvailability = dayAvailability =>
            dayAvailability.map(slot => ({
                startTime: slot.startTime,
                endTime: slot.endTime
            }));
    
        const {
            name,
            centerId = 1,
            uniqueMachineCode,
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
            name,
            centerId,
            uniqueMachineCode,
            machineAvailability: {
                Monday: {
                    startTime: mondayAvailability[0].startTime,
                    endTime: mondayAvailability[mondayAvailability.length - 1].endTime
                },
                Tuesday: {
                    startTime: tuesdayAvailability[0].startTime,
                    endTime: tuesdayAvailability[tuesdayAvailability.length - 1].endTime
                },
                Wednesday: {
                    startTime: wednesdayAvailability[0].startTime,
                    endTime: wednesdayAvailability[wednesdayAvailability.length - 1].endTime
                },
                Thursday: {
                    startTime: thursdayAvailability[0].startTime,
                    endTime: thursdayAvailability[thursdayAvailability.length - 1].endTime
                },
                Friday: {
                    startTime: fridayAvailability[0].startTime,
                    endTime: fridayAvailability[fridayAvailability.length - 1].endTime
                },
                Saturday: {
                    startTime: saturdayAvailability[0].startTime,
                    endTime: saturdayAvailability[saturdayAvailability.length - 1].endTime
                },
                Sunday: {
                    startTime: sundayAvailability[0].startTime,
                    endTime: sundayAvailability[sundayAvailability.length - 1].endTime
                }
            },
            // mondayAvailability: mapAvailability(mondayAvailability),
            // tuesdayAvailability: mapAvailability(tuesdayAvailability),
            // wednesdayAvailability: mapAvailability(wednesdayAvailability),
            // thursdayAvailability: mapAvailability(thursdayAvailability),
            // fridayAvailability: mapAvailability(fridayAvailability),
            // saturdayAvailability: mapAvailability(saturdayAvailability),
            // sundayAvailability: mapAvailability(sundayAvailability)
        }));
    }, [data]);

    
    console.log("check formm data---->>>", formData)

    const handleCopyTime = (e) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            const startTime = formData.machineAvailability.Monday.startTime;
            const endTime = formData.machineAvailability.Monday.endTime;
            const updatedMachineAvailability = Object.keys(formData.machineAvailability).reduce((acc, day) => {
                acc[day] = { startTime, endTime };
                return acc;
            }, {});
            setFormData(prevData => ({
                ...prevData,
                machineAvailability: updatedMachineAvailability,
            }));
        } else {
            const updatedMachineAvailability = Object.keys(formData.machineAvailability).reduce((acc, day) => {
                acc[day] = { startTime: '', endTime: '' };
                return acc;
            }, {});
            setFormData(prevData => ({
                ...prevData,
                machineAvailability: updatedMachineAvailability,
            }));
        }
    };
    return (
        <div className="add-edit-machine-form">
            <h3>{data ? "Update Machine" : "Add Machine"}</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Machine Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required />
                </div>
                <div className="form-row">

                    <div className="form-group">
                        <label htmlFor="uniqueMachineCode">Machine Code</label>
                        <input type="text" id="uniqueMachineCode" uniqueMachineCode="uniqueMachineCode" value={formData.uniqueMachineCode} onChange={(e) => setFormData({ ...formData, uniqueMachineCode: e.target.value })}
                            required />
                    </div>

                    {/* <div className="form-group">
                        <label htmlFor="centerId">Choose Center</label>
                        <select id="centerId" name="centerId" value={formData.centerId} onChange={(e) => setFormData({ ...formData, centerId: e.target.value })} required>
                            <option value="">Select Admin</option>
                            <option value="admin1">Admin 1</option>
                            <option value="admin2">Admin 2</option>
                            <option value="admin3">Admin 3</option>
                        </select>
                    </div> */}

                    <div className="form-group">
                        <label htmlFor="centerId">Choose Center</label>
                        <select id="centerId" name="centerId" value={formData.centerId} onChange={(e) => setFormData({ ...formData, centerId: e.target.value })} required>
                            <option value="">Select Center</option>
                            {centerList?.map(center => (
                                <option key={center.id} value={center.id}>{center.name}</option>
                            ))}
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

                <h3>Machine Availability</h3>
                {!data && <div style={{ display: 'flex', float: "right", width: "150px" }}>
                    <label>Copy&nbsp;Time</label>
                    <input type='checkbox' onChange={handleCopyTime} />
                </div>}
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
                        {Object.entries(formData.machineAvailability).map(([day, availability], index) => (
                            <tr key={index}>
                                <td>{day}</td>
                                <td>
                                    <input
                                        type="time"
                                        step="3600"
                                        name="startTime"
                                        value={availability.startTime}
                                        onChange={(e) => handleChange(e, day)}
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="time"
                                        step="3600"
                                        name="endTime"
                                        value={availability.endTime}
                                        onChange={(e) => handleChange(e, day)}
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
                    // disabled={isSubmitting}
                    style={{
                        background: isSubmitting ? 'gray' : '#007bff',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    }}
                >
                    {isSubmitting ? (data ? 'Updating...' : 'Submitting...') : (data ? 'Update' : 'Submit')}
                </button>
            </form>
            {data && <div>
                <h3>Machine Previous Record</h3>
                <TableComponent data={productList.slice(0,5)} />
            </div>}
        </div>
    );
};

export default AddEditMachineForm;



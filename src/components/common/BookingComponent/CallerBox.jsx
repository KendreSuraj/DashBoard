import React, { useEffect, useState } from 'react';
import { Paper, Button, FormControl, TextareaAutosize, TextField, MenuItem, Grid } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getToken } from '../userLocalStorageUtils';
import { hasAdminAndSuperAdminAccess } from '../UserRolesConfig';

const CallerBox = (props) => {
    const role = JSON.parse(localStorage.getItem('userData'))?.user?.role;
    const [callersList, setCallersList] = useState([])
    const [selectedCaller, setSelectedCaller] = useState("")
    const params = useParams();
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!selectedCaller) {
            alert("Please select a caller name.")
            return
        }
        const callerVariableArr = selectedCaller.split(" - ")
        const id = callerVariableArr.length > 0 ? callerVariableArr[0] : null
        if (!id) {
            alert("No caller found.")
            return
        }
        const callerObj = callersList.find((obj) => obj.id == id)
        if (!callerObj) {
            alert("Caller details not found.")
            return
        }

        const reqBody = {
            sessionScheduleId: params.sessionScheduleId,
            callerName: callerObj.name ? callerObj.name : "",
            callerPhone: callerObj.phone ? callerObj.phone : ""
        }
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/api/v1/admin/booking/add-caller`,
                reqBody,
                {
                    headers: {
                        Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
                        token: getToken(),
                    },
                },
            )
            .then((response) => {
                alert("Caller Added")
                window.location.reload();
            })
            .catch((err) => console.log(err));

    };


    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/v1/admin/booking/caller-list`, {
                headers: {
                    Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
                    token: getToken(),
                },
            })
            .then(response => {
                const callersList =
                    response.data && response.data.callers
                        ? response.data.callers
                        : [];


                setCallersList(callersList);
                const callerObj = callersList.find(caller => caller.name === props.callerDetails.callerName && caller.phone === props.callerDetails.callerPhone)
                if (callerObj) {
                    const selectedCallerStr = `${callerObj.id} - ${callerObj.name}`
                    console.log(selectedCallerStr)
                    setSelectedCaller(selectedCallerStr)
                }


            })
            .then(err => {
                console.log("ERR: callersList......", err)
            })
    }, [props.callerDetails])


    const handleCallerChange = (event) => {
        setSelectedCaller(event.target.value);
    };

    return (
        <>

            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                <h3>Caller Name</h3>
                <form>
                    <Grid container spacing={2} alignItems="center">
                        {/* First Therapist */}


                        <TextField
                            select
                            label="Callers"
                            fullWidth
                            margin="normal"
                            value={selectedCaller}
                            onChange={handleCallerChange}
                            // disabled={props.isDisabled}
                            required
                        >
                            {callersList && callersList.length > 0 ? (
                                callersList.map((caller) => (
                                    <MenuItem
                                        value={`${caller.id} - ${caller.name}`}
                                        key={caller.id}
                                    >
                                        {caller.name} - {caller.phone}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem value="value">Enter</MenuItem>
                            )}
                        </TextField>




                        {/* Submit Button */}
                        <Grid item xs={12}>
                           {hasAdminAndSuperAdminAccess(role)&& <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                onClick={handleSubmit}
                                // disabled={props.isDisabled}
                            >
                                Submit
                            </Button>}
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </>
    );
};

export default CallerBox;

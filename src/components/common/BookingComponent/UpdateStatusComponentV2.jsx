// UpdateStatusComponent.js
import React, { useEffect, useState } from 'react';
import { Paper, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { autoAllocateTherapistAndMachine, cancelBooking } from '../../../store/actions/therapist.action';
import { hasAdminAndSuperAdminAccess } from '../UserRolesConfig';
import CircularProgress from '@mui/material/CircularProgress';
import { addBookingActionLog } from '../../../store/actions/booking.action';

const UpdateStatusComponentV2 = (props) => {
    const role = JSON.parse(localStorage.getItem('userData'))?.user?.role;
    const user = JSON.parse(localStorage.getItem('userData'))?.user;
    const [selectedStatus, setSelectedStatus] = useState("");
    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };
    const body = props?.body
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const addUserActivity = async (data) => {
        const body1={
            session_schedule_id:body?.sessionScheduleId,
            dashboard_user_id:user?.id,
            dashboard_user_name:user?.name,
            operation_type:data.operation_type,
            operation_string:data.operation_string,
          }
        try {
            await addBookingActionLog(body1);
        } catch (error) {
            console.error("Error adding user log:", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsButtonDisabled(true)
        if (selectedStatus.length < 1) {
            alert("Please select a status")
            return
        }
        const reqBody = {
            slotDate: body?.slotDate,
            slotTime: body?.slotTime,
            productId: body?.productId,
            sessionScheduleId: body?.sessionScheduleId,
            clientLat:body?.clientLat,
            clientLong:body?.clientLong,
            city:body?.city
        }
        if (props?.selectedStatus !== "CANCELLED" && selectedStatus === "CANCELLED") {
            const res = await cancelBooking(reqBody)
            if (res?.status === 200) {
                addUserActivity({
                    operation_string: `Dashboard user ${user?.name} canceled this booking.`,
                    operation_type: "cancel-booking"
                  });                  
                alert(res.data?.status?.message);
                window.location.reload()
            }
        } else if (props?.selectedStatus === "CANCELLED" && selectedStatus === "SCHEDULED") {
            const res = await autoAllocateTherapistAndMachine(body)
            if (res?.status === 200) {
                addUserActivity({
                    operation_string: `Dashboard user ${user?.name} scheduled this booking.`,
                    operation_type: "booking-schedule"
                  });                  
                alert(res.data?.status?.message);
                window.location.reload()
            }
        }
        else {
            props.updateStatusHandler(selectedStatus)
        }
    };

    useEffect(() => {
        setSelectedStatus(props.selectedStatus)
    }, [props.selectedStatus])
    return (
        <div>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                <h3>Change Status</h3>
                <form >
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            labelId="status-label"
                            label="Status"
                            value={selectedStatus}  // Provide the selected value
                            onChange={handleStatusChange}
                        >
                            {/* <MenuItem value="PENDING" disabled>PENDING</MenuItem> */}
                            <MenuItem value="COMPLETED">COMPLETED</MenuItem>
                            <MenuItem value="SCHEDULED">SCHEDULED</MenuItem>
                            <MenuItem value="CANCELLED">CANCELLED</MenuItem>
                            {/* <MenuItem value="POSTPONED" disabled>POSTPONED</MenuItem> */}
                            <MenuItem value="PAID" disabled>PAID</MenuItem>
                            <MenuItem value="SESSION_START" disabled>SESSION_START</MenuItem>
                            {/* <MenuItem value="SESSION_END" disabled>SESSION_END</MenuItem> */}
                        </Select>
                    </FormControl>
                    {hasAdminAndSuperAdminAccess(role)&&<Button variant="contained" color="primary" type="submit" onClick={handleSubmit}
                    disabled={isButtonDisabled || props?.isDisabled}
                    >
                  {isButtonDisabled ? (
                    <CircularProgress size={24} color="inherit" />
                    ) : (
                    'Submit'
                    )}
                    </Button>}
                </form>
            </Paper>
        </div>
    );
};

export default UpdateStatusComponentV2;

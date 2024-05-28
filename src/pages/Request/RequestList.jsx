import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTherapistCustomslots, updateCustomTherapistSlot } from '../../store/actions/therapist.action'
import { useLocation } from 'react-router-dom';

import './RequestList.css'
import { fetchAdmin } from '../../store/actions/center.action'
import { Button } from '@mui/material'

const RequestList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let therapistCustomSlot = useSelector(state => state?.therapist?.therapistCustomSlot?.slotDetails)
    const adminList = useSelector(state => state.center?.adminList)
    useEffect(() => {
        dispatch(fetchTherapistCustomslots())
        dispatch(fetchAdmin())
    }, [dispatch])

    const localToken = JSON.parse(localStorage.getItem("userData"))
    const updateTherapistRequest = async (id, isApproved) => {
        try {
            const res = await updateCustomTherapistSlot(id, { adminId: parseInt(localToken?.user?.id), isApproved: isApproved });
            if (res.data?.status.code === 200) {
                window.location.reload()
                alert(res?.data.status?.message)
            } else if (res?.response?.data?.status.code === 400) {
                alert(res?.response?.data?.status?.message)
            }
        } catch (error) {
            return error;
        }
    };

    const getAdminNameById = (id) => {
        for (let i = 0; i < adminList.length; i++) {
            if (adminList[i].id === id) {
                return adminList[i].name;
            }
        }
    }

    return (
        <div>
            {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: "30px" }}>
                <h3 style={{ margin: '0 auto' }}>All  Therapist Request</h3>
            </div> */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: "30px" }}>
                <h3 style={{ margin: '0 auto' }}>Therapist Unavailability/Request</h3>
                <Button variant="contained" color="primary" onClick={() => navigate("/addtherapist-unavailability")}>Add Therapist Request</Button>
            </div>
            <div className="table-container">
                <table className="schedule-table">
                    <thead>
                        <tr>
                            <th className="table-header">Name</th>
                            <th className="table-header">Phone</th>
                            <th className="table-header">Employee Id</th>
                            <th className="table-header">Start Date</th>
                            <th className="table-header">End Date</th>
                            <th className="table-header">Start Time</th>
                            <th className="table-header">End Time</th>
                            <th className="table-header">Type</th>
                            <th className="table-header">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {therapistCustomSlot?.map(schedule => (
                            <tr key={schedule.id}>
                                <td>{schedule.scheduler_therapist.name}</td>
                                <td>{schedule.scheduler_therapist.phone}</td>
                                <td>{schedule.scheduler_therapist.employeeId}</td>
                                <td>{new Date(schedule.startDate).toLocaleDateString('en-GB')}</td>
                                <td>{new Date(schedule.endDate).toLocaleDateString('en-GB')}</td>
                                <td>{schedule.startTime}</td>
                                <td>{schedule.endTime}</td>
                                <td>{schedule.type}</td>
                                <td>

                                    {schedule?.isApproved === null && <button className="action-btn" onClick={() => updateTherapistRequest(schedule.id, true)}>Approve</button>}
                                    {schedule?.isApproved === null && <button className="action-btn" onClick={() => updateTherapistRequest(schedule.id, false)}>Reject</button>}
                                    {schedule?.isApproved && `Approved By:${getAdminNameById(schedule.adminId)}`}
                                    {schedule?.isApproved === false && `Rejected By:${getAdminNameById(schedule.adminId)}`}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RequestList
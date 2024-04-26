import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTherapistCustomslots, updateCustomTherapistSlot } from '../../store/actions/therapist.action'

import './RequestList.css'
const RequestList = () => {
    const dispatch = useDispatch()
    let therapistCustomSlot = useSelector(state => state?.therapist?.therapistCustomSlot?.slotDetails)
    console.log("see slot", therapistCustomSlot)
    useEffect(() => {
        dispatch(fetchTherapistCustomslots())
    }, [dispatch])

    const localToken = JSON.parse(localStorage.getItem("userData"))
    const updateTherapistRequest = async (id, isApproved) => {
        try {
            const res = await updateCustomTherapistSlot(id, { adminId: parseInt(localToken?.user?.id), isApproved: isApproved });
            if (res.data?.status.code == 200) {
                window.location.reload()
                alert(res?.data.status?.message)
            }
        } catch (error) {
            return error;
        }
    };


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: "30px" }}>
                <h3 style={{ margin: '0 auto' }}>All  Therapist Request</h3>
            </div>
            <div className="table-container">
                <table className="schedule-table">
                    <thead>
                        <tr>
                            <th className="table-header">ID</th>
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
                                <td>{schedule.id}</td>
                                <td>{new Date(schedule.startDate).toLocaleDateString('en-GB')}</td>
                                <td>{new Date(schedule.endDate).toLocaleDateString('en-GB')}</td>
                                <td>{schedule.startTime}</td>
                                <td>{schedule.endTime}</td>
                                <td>{schedule.type}</td>
                                <td>

                                    {schedule?.isApproved === null && <button className="action-btn" onClick={() => updateTherapistRequest(schedule.id, true)}>Approve</button>}
                                    {schedule?.isApproved === null && <button className="action-btn" onClick={() => updateTherapistRequest(schedule.id, false)}>Reject</button>}
                                     {schedule?.isApproved&&"Approve"}
                                     {schedule?.isApproved===false &&"Reject"}
                                    {/* {schedule?.isApproved === true ? 'Approved' : 'Rejected'} */}
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
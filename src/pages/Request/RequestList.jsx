import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTherapistCustomslots } from '../../store/actions/therapist.action'
import { Button } from '@material-ui/core'
import TableComponent from '../../components/common/TableComponent/TableComponent'
import './RequestList.css'
const RequestList = () => {
    const dispatch = useDispatch()
    let therapistCustomSlot = useSelector(state => state?.therapist?.therapistCustomSlot?.slotDetails)

    useEffect(() => {
        dispatch(fetchTherapistCustomslots())
    }, [dispatch])

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
                                    <button className="action-btn" onClick={() => onAccept(schedule.id)}>Accept</button>
                                    <button className="action-btn" onClick={() => onApprove(schedule.id)}>Approve</button>
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
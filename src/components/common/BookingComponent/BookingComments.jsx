import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookingComments } from '../../../store/actions/booking.action';
import { fetchAdmin } from '../../../store/actions/center.action';
const BookingComments = ({sessionScheduleId}) => {
    const  dispatch=useDispatch()
    const bookingComments = useSelector((state) => state?.booking?.bookingComments)
    const adminList = useSelector(state => state.center?.adminList)
    useEffect(()=>{
        if(sessionScheduleId){
            dispatch(fetchBookingComments(sessionScheduleId))
            dispatch(fetchAdmin())
        }
    },[sessionScheduleId])

    const getAdminNameById = (id) => {
        for (let i = 0; i < adminList.length; i++) {
            if (adminList[i].id === id) {
                return adminList[i].name;
            }
        }
    }
  return (
    <div>
     <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>S.N</th>
            {/* <th>Session Schedule Id</th> */}
            <th>Added By</th>
            <th>Comment</th>
            <th>Updated Date</th>
          </tr>
        </thead>
        <tbody>
          {bookingComments?.length > 0 ? (
            bookingComments.map((data,idx) => (
              <tr key={idx}>
                <td>{idx+1}</td>
                {/* <td>{data.sessionScheduleId}</td> */}
                <td>{getAdminNameById(data.adminUserId)}</td>
                <td>{data.comment}</td>
                <td>{new Date(data.createdAt).toLocaleDateString('en-GB')}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', fontWeight: 'bold' }}>No Comments Available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default BookingComments
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdmin } from '../../store/actions/center.action';
import { fetchBookingActionLogs } from '../../store/actions/booking.action';

const BookingActionLogs = ({sessionScheduleId,userLogs}) => {
    const  dispatch=useDispatch()
    const bookingActionLog = useSelector((state) => state?.booking?.bookingActionLogs)
    const adminList = useSelector(state => state.center?.adminList)
    useEffect(()=>{
        if(sessionScheduleId){
            dispatch(fetchBookingActionLogs(sessionScheduleId))
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
        <h3>Booking Action Logs</h3>
     <table className="custom-table">
       <thead>
         <tr>
           <th>S.N</th>
           <th>Action done By</th>
           <th>Action</th>
           <th>Action Date</th>
           <th>Action Time</th>
         </tr>
       </thead>
       <tbody>
         {[...bookingActionLog,...userLogs]?.length > 0 ? (
           [...bookingActionLog,...userLogs].map((data,idx) => (
             <tr key={idx}>
               <td>{idx+1}</td>
               <td>{data.dashboard_user_id?data.dashboard_user_name:data?.app_user_name}</td>
               {/* <td>{getAdminNameById(data.dashboard_user_id)}</td> */}
               <td>{data.operation_string?data.operation_string:data?.activity}</td>
               <td>{new Date(data.created_at).toLocaleDateString('en-GB')}</td>
               <td>{new Date(new Date(data.created_at).getTime() + 5.5 * 60 * 60 * 1000).toISOString().split('T')[1].split('.')[0]}</td>
             </tr>
           ))
         ) : (
           <tr>
             <td colSpan="6" style={{ textAlign: 'center', fontWeight: 'bold' }}>No booking Action logs</td>
           </tr>
         )}
       </tbody>
     </table>
   </div>
   </div>
  )
}

export default BookingActionLogs
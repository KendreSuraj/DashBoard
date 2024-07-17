import React, { useState } from 'react'
import "./slotModal.style.css"
import { Button } from '@mui/material'
const SlotModal = ({ timeRange,serviceId,therapistId,day,onFree,onClose}) => {
    const [isDisabled, setIsDisabled] = useState(false); 
    const handleFreeSlot = () => {
        onFree();
        setIsDisabled(true);
    };
    const handleView=()=>{
        onClose()
        window.open(`/booking-details/${serviceId}`, '_blank')
    }
    return (
        <div className="slot-modal">
            <div className="slot-modal-content">
                <span className="slot-close" onClick={onClose}>&times;</span>
                <h3> Are you sure want Free slot of:</h3>
                <h3 style={{ textAlign: "center" }}>
                    <span style={{ backgroundColor: "red", color: "white", padding: '10px' }}>{timeRange}</span>
                </h3>
                {serviceId&&<button className='view-slot-button' onClick={()=>handleView()}>View Booking</button>}
                <button className='slot-button' onClick={handleFreeSlot} disabled={isDisabled}>Free Slot</button>
            </div>
        </div>
    )
}

export default SlotModal
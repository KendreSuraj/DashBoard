import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addTherapistUnavailabilityAndLeave, fetchTherapist, updateCustomTherapistSlot } from '../../store/actions/therapist.action';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCenter } from '../../store/actions/center.action';
import { fetchBookingsByPartner } from '../../store/actions/booking.action';
import TableComponent from '../../components/common/TableComponent/TableComponent';
import { splitDateTime } from '../../utils';

const AddTherapistUnavailability = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filteredTherapistList, setFilteredTherapistList] = useState([]);
    const therapistList = useSelector(state => state?.therapist?.therapistList?.therapists || []);
    const centerList = useSelector(state => state.center?.centerList?.centers || []);
    // let bookingList = useSelector((state) => state.booking.bookingList?.bookings);
    const [bookingList, setBookingList] = useState([])

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [formData, setFormData] = useState({
        therapistId: '',
        startDate: today.toISOString().split('T')[0],
        endDate: tomorrow.toISOString().split('T')[0],
        startTime: '',
        endTime: '',
        type: '',
        centerId: '',
        therapistName: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        dispatch(fetchCenter());
        dispatch(fetchTherapist());
    }, [dispatch]);

    useEffect(() => {
        if (formData.centerId) {
            const filteredTherapists = therapistList.filter(therapist => parseInt(therapist.centerId) === parseInt(formData.centerId));
            setFilteredTherapistList(filteredTherapists);
        } else {
            setFilteredTherapistList(therapistList);
        }
    }, [formData.centerId, therapistList]);

    const handleBookingDetail = (details) => {
        console.log(details);
        navigate(`/booking-details/${details['Service Id']}`);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "therapistId") {
            const selectedTherapist = filteredTherapistList.find(therapist => therapist.id === parseInt(value));
            setFormData({
                ...formData,
                therapistId: value,
                therapistName: selectedTherapist ? selectedTherapist.name : ''
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsSubmitting(true);
            const reqBody = formData.type === "LEAVE"
                ? {
                    therapistId: parseInt(formData?.therapistId),
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                    type: formData.type,
                }
                : {
                    therapistId: parseInt(formData?.therapistId),
                    startDate: formData.startDate,
                    type: formData.type,
                    startTime: formData.startTime + ":00",
                    endTime: formData.endTime + ":00",
                };
            const res = await addTherapistUnavailabilityAndLeave(reqBody);
            console.log("REEEEEEEE", res)
            if (res?.status?.code === 200) {
                alert(res.status?.message);
                navigate("/allrequestlist");
            } else {
                alert(res)
                window.location.reload()
            }
            setIsSubmitting(false);
        } catch (err) {
            console.log("EEEEEEEErrrrrrr", err)
            alert(err)
            window.location.reload()
        }
    };

    const fetchBookingData = async () => {
        const obj = {
            startDate: formData.startDate,
            endDate: formData.endDate,
            page: 1,
            searchType: "partnerName",
            searchText: formData.therapistName
        };
        const res = await fetchBookingsByPartner(obj)
        if (res.status.code === 200) {
            //  setBookingList(res?.bookings)
            const bookingList = res.bookings.map(data => {
                const formattedDate = splitDateTime(data.appointmentAt);
                const bookingDate = splitDateTime(data.bookingAt);

                return {
                    'Service Id': data?.sessionSchedulesId,
                    'Client Name': data.name ? data.name : '',
                    'Gender': data?.gender,
                    'Phone Number': data.phoneNumber,
                    'City': data.city ? data.city : '',
                    'Service Name': data.productName ? data.productName : '',
                    'Service Date': formattedDate.date,
                    'Service Time': formattedDate.time,
                    'Service Status': data.status ? data.status : '',
                    'Partner Name': data.partnerName ? data.partnerName : 'Not Assigned',
                    "Start Time": data.startTime ? data.startTime : "",
                    "End Time": data.endTime ? data.endTime : "",
                    "Comment": data.comment ? data.comment : "",
                    "Booking Date": bookingDate?.date,
                    "Booking Time": data?.bookingTime
                };
            });
            setBookingList(bookingList);
        }
    };

    useEffect(() => {
        if (formData?.therapistName && formData?.centerId) {
            fetchBookingData();
        }
    }, [formData.therapistName, formData.startDate, formData.endDate]);

    return (
        <div className="add-center-form">
            <h3>Add Unavailable/Leave Request</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="centerId">Center</label>
                    <select id="centerId" name="centerId" value={formData.centerId} onChange={handleChange} required>
                        <option value="">Select Center</option>
                        {centerList.map(center => (
                            <option key={center.id} value={center.id}>{center.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="therapistId">Therapist</label>
                        <select id="therapistId" name="therapistId" value={formData.therapistId} onChange={handleChange} required>
                            <option value="">Select Therapist</option>
                            {filteredTherapistList.map(therapist => (
                                <option key={therapist.id} value={therapist.id}>{therapist.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="type">Leave Type</label>
                        <select name="type" value={formData.type} onChange={handleChange} required>
                            <option value="">Select Type</option>
                            <option value="LEAVE">LEAVE</option>
                            <option value="UNAVAILABLE">UNAVAILABLE</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="startDate">Start Date</label>
                        <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} required />
                    </div>
                    {(formData.type === "LEAVE") && (
                        <div className="form-group">
                            <label htmlFor="endDate">End Date</label>
                            <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} min={formData.startDate} required />
                        </div>
                    )}
                </div>
                {formData.type === "UNAVAILABLE" && (
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="startTime">Start Time</label>
                            <input type="time" step="3600" id="startTime" name="startTime" value={formData.startTime} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endTime">End Time</label>
                            <input type="time" step="3600" id="endTime" name="endTime" value={formData.endTime} onChange={handleChange} required />
                        </div>
                    </div>
                )}
                <button
                    className="add-edit-button"
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        background: isSubmitting ? 'gray' : '#007bff',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
            <h3>Therapist History</h3>
            <div className="date-rage">
                <input type="date" disabled value={formData.startDate} />
                <input type="date" disabled value={formData.endDate} />
            </div>
            <TableComponent
                data={bookingList}
                viewBookingButton={'view'}
                bookingDetails={handleBookingDetail}
            />
        </div>
    );
};

export default AddTherapistUnavailability;

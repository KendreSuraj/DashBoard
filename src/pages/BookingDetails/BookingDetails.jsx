import React, { useEffect, useState } from 'react';
import UserDetailsComponent from '../../components/common/BookingComponent/UserDetailComponent';
import { Grid } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getToken } from '../../components/common/userLocalStorageUtils';
import AllotTherapistComponent from '../../components/common/BookingComponent/AllotTherapist';
import UpdateStatusComponent from '../../components/common/BookingComponent/UpdateStatusComponent';
import moment from 'moment';
import { splitDateTime } from '../../utils';

const BookingDetails = () => {
  // const navigate = useNavigate()
  const [userDataObject, setUserDataObject] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null)
  const [partnerNameStr, setPartnerNameStr] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const params = useParams();
  const { sessionId } = params;

  const handleSubmitAllotTherapist = (data) => {
    const { selectedTherapist, selectedDate, startTime, endTime } = data;

    const originalStartTime = `${startTime.hour}:${startTime.minute} ${startTime.ampm}`;
    const originalEndTime = `${endTime.hour}:${endTime.minute} ${endTime.ampm}`;
    const formattedStartTime = moment(originalStartTime, 'hh:mm A').format(
      'HH:mm:ss',
    );
    const formattedEndTime = moment(originalEndTime, 'hh:mm A').format(
      'HH:mm:ss',
    );
    const reqBody = {
      sessionId,
      partnerId: selectedTherapist,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      date: selectedDate,
    };

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/booking/allocate-therapist`,
        reqBody,
        {
          headers: {
            Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
            token: getToken(),
          },
        },
      )
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleStatusUpdate = (data) => {
    const reqBody = {
      status: data,
      sessionId,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/booking/update-session-status`,
        reqBody,
        {
          headers: {
            Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
            token: getToken(),
          },
        },
      )
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/booking/booking-details/${sessionId}`,
        {
          headers: {
            Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
            token: getToken(),
          },
        },
      )
      .then((response) => {
        const bookingDetail =
          response.data && response.data.bookingDetail
            ? response.data.bookingDetail
            : null;
        const partnerDetail =
          response.data && response.data.partnerDetail
            ? response.data.partnerDetail
            : null;
        const formattedDateAndTime= bookingDetail && bookingDetail.appointmentAt ?splitDateTime(bookingDetail.appointmentAt) : '-'
        const detailObj = {
          Name: bookingDetail && bookingDetail.name ? bookingDetail.name : '-',
          Phone:
            bookingDetail && bookingDetail.phoneNumber
              ? bookingDetail.phoneNumber
              : '-',
          Address:
            bookingDetail && bookingDetail.addressArea
              ? bookingDetail.addressArea
              : '',
          Service:
            bookingDetail && bookingDetail.productName
              ? bookingDetail.productName
              : '-',
           "Booking Date":formattedDateAndTime?.date,
           "Booking Time":formattedDateAndTime?.time,
          Status:
            bookingDetail && bookingDetail.status ? bookingDetail.status : '-',
          Therapist:
            partnerDetail && partnerDetail.name ? partnerDetail.name : '-',
          'Therapist phone':
            partnerDetail && partnerDetail.phone ? partnerDetail.phone : '-',
          'Therapist Email':
            partnerDetail && partnerDetail.email ? partnerDetail.email : '-',
        };
        const extractedStartDate = partnerDetail && partnerDetail.date ? partnerDetail.date.split('T')[0] : "";
        let parsedStartTime = "";
        if (partnerDetail && partnerDetail.startTime) {
          parsedStartTime = moment(partnerDetail.startTime, "HH:mm:ss");
        }
        let parsedEndTime = ""
        if (partnerDetail && partnerDetail.endTime) {
          parsedEndTime = moment(partnerDetail.endTime, "HH:mm:ss");
        }
        const extractedStartHour = parsedStartTime ? parsedStartTime.format("hh") : ""
        const extractedStartMinutes = parsedStartTime ? parsedStartTime.format("mm") : ""
        const startAmPm = parsedStartTime ? parsedStartTime.format("A") : ""
        const extractedEndHour = parsedEndTime ? parsedEndTime.format("hh") : ""
        const extractedEndMinutes = parsedEndTime ? parsedEndTime.format("mm") : ""
        const endAmPm = parsedEndTime ? parsedEndTime.format("A") : ""
        setStartDate(extractedStartDate)
        setStartTime({
          hour: extractedStartHour, minute: extractedStartMinutes, ampm: startAmPm
        })
        setEndTime({
          hour: extractedEndHour,
          minute: extractedEndMinutes,
          ampm: endAmPm
        })
        const partnerName = partnerDetail && partnerDetail.name ? partnerDetail.name : ''
        const partnerId = partnerDetail && partnerDetail.id ? partnerDetail.id : ""
        setPartnerNameStr(`${partnerId} - ${partnerName}`)
        setSelectedStatus(detailObj.Status)
        setUserDataObject(detailObj);
        
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {/* Render the UserDetailsBox component with the userDataObject */}
      {Object.keys(userDataObject).length > 0 ? (
        <UserDetailsComponent data={userDataObject} />
      ) : (
        ''
      )}


      <Grid item xs={12} md={6}>
        <Grid container spacing={2} mt={4}>
          <Grid item xs={6}>
            <AllotTherapistComponent
              handleAllotTherapist={handleSubmitAllotTherapist}
              partnerNameStr={partnerNameStr ? partnerNameStr : ""}
              startDate={startDate ? startDate : ""}
              startTime={startTime ? startTime : ""}
              endTime={endTime ? endTime : ""}
              isDisabled= {userDataObject.Status === "COMPLETED" || userDataObject.Status === "PAID"}

            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UpdateStatusComponent updateStatusHandler={handleStatusUpdate} selectedStatus={selectedStatus} />
          </Grid>
        </Grid>
      </Grid>

    </div>
  );
};

export default BookingDetails;

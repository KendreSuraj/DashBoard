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
import AllotDate from '../../components/common/BookingComponent/AllotDate';
import CommentBox from '../../components/common/BookingComponent/CommentBox';
import CallerBox from '../../components/common/BookingComponent/CallerBox';

import PaymentHistory from '../../components/common/BookingComponent/PaymentHistory';
import UserLogs from '../../components/common/BookingComponent/UserLogs';
import AllotMachine from '../../components/common/BookingComponent/AllotMachine';
import { fetchAvailableTherapist } from '../../store/actions/therapist.action';
import { useDispatch } from 'react-redux';
import UpdateStatusComponentV2 from '../../components/common/BookingComponent/UpdateStatusComponentV2';
import AllotDateV2 from '../../components/common/BookingComponent/AllotDateV2';
import AllotTherapistV1 from '../../components/common/BookingComponent/AllotTherapistV1';
import { addHoursToTime, subtractHoursFromTime } from '..';
import UpdateStatusComponentPackage from '../../components/common/BookingComponent/UpdateStatusComponentPackage';
import BookingComments from '../../components/common/BookingComponent/BookingComments';

const BookingDetails = () => {
  // const navigate = useNavigate()
  const dispatch = useDispatch();
  const [userDataObject, setUserDataObject] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [partnerNameStr, setPartnerNameStr] = useState('');
  const [secondPartnerStr, setSecondPartnerStr] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [bookingData, setBookingData] = useState({});
  const [callerDetails, setCallerDetails] = useState({
    callerName: '',
    callerPhone: '',
  });
  const [machineDetail, setMachineDetail] = useState({});
  const [userLogs, setUserLogs] = useState([]);
  const [isPackage, setIsPackage] = useState(false);
  const [packageSessionData, setPackageSessionData] = useState(null);

  const params = useParams();

  const handleSubmitAllotTherapist = (data) => {
    // const { selectedTherapist, selectedDate, startTime, endTime } = data;
    // const originalStartTime = `${startTime.hour}:${startTime.minute} ${startTime.ampm}`;
    // const originalEndTime = `${endTime.hour}:${endTime.minute} ${endTime.ampm}`;
    // const formattedStartTime = moment(originalStartTime, 'hh:mm A').format(
    //   'HH:mm:ss',
    // );
    // const formattedEndTime = moment(originalEndTime, 'hh:mm A').format(
    //   'HH:mm:ss',
    // );
    // const reqBody = {
    //   sessionId,
    //   partnerId: selectedTherapist,
    //   startTime: formattedStartTime,
    //   endTime: formattedEndTime,
    //   date: selectedDate,
    // };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/booking/allocate-therapist`,
        {
          sessionScheduleId: params.sessionScheduleId,
          partnerId: data.selectedTherapist,
          partner1: data.secondSelectedTherapist
            ? data.secondSelectedTherapist
            : null,
        },
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

  const updatePackageSessionStatus = (data) => {
    try {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/v1/admin/booking/update-package-session-status`,
          data,
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
    } catch (err) {
      console.log('ERR while updating the status of packages', err);
      alert('ERR while updating the status of packages');
    }
  };

  const handleStatusUpdate = (data) => {
    const reqBody = {
      status: data,
      sessionScheduleId: params.sessionScheduleId,
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
        `${process.env.REACT_APP_API_URL}/api/v1/admin/booking/booking-details/${params.sessionScheduleId}`,
        {
          headers: {
            Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
            token: getToken(),
          },
        },
      )
      .then((response) => {
        console.log("see resposne--->>",response)
        setBookingData(response?.data);
        const bookingDetail =
          response.data && response.data.bookingDetail
            ? response.data.bookingDetail
            : null;
        const partnerDetail =
          response.data && response.data.partnerDetail
            ? response.data.partnerDetail
            : null;

        const secondPartnerDetail =
          response.data && response.data.secondPartnerDetail
            ? response.data.secondPartnerDetail
            : null;
        const formattedDateAndTime =
          bookingDetail && bookingDetail.appointmentAt
            ? splitDateTime(bookingDetail.appointmentAt)
            : '-';
        const isPackage = bookingDetail && bookingDetail.isPackage;
        setIsPackage(isPackage);
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
          Service: bookingDetail
            ? bookingDetail.isPackage
              ? bookingDetail.productNames // if isPackage is true, use productNames
              : bookingDetail.productName // if isPackage is false, use productName
            : '-', // if bookingDetail is not present, use '-'
          'Booking Date': formattedDateAndTime?.date,
          'Booking Time': formattedDateAndTime?.time,
          Status:
            bookingDetail && bookingDetail.status ? bookingDetail.status : '-',
          Therapist:
            partnerDetail && partnerDetail.name ? partnerDetail.name : '-',
          'Therapist phone':
            partnerDetail && partnerDetail.phone ? partnerDetail.phone : '-',
          'Therapist Email':
            partnerDetail && partnerDetail.email ? partnerDetail.email : '-',
          'Therapist Id': partnerDetail?.id,
        };
        const machineDetails = {
          'Machine Name': response?.data?.machineDetail?.name,
          'Machine Id': response?.data?.machineDetail?.id,
        };
        const extractedStartDate =
          partnerDetail && partnerDetail.date
            ? partnerDetail.date.split('T')[0]
            : '';
        let parsedStartTime = '';
        if (partnerDetail && partnerDetail.startTime) {
          parsedStartTime = moment(partnerDetail.startTime, 'HH:mm:ss');
        }
        let parsedEndTime = '';
        if (partnerDetail && partnerDetail.endTime) {
          parsedEndTime = moment(partnerDetail.endTime, 'HH:mm:ss');
        }
        const extractedStartHour = parsedStartTime
          ? parsedStartTime.format('hh')
          : '';
        const extractedStartMinutes = parsedStartTime
          ? parsedStartTime.format('mm')
          : '';
        const startAmPm = parsedStartTime ? parsedStartTime.format('A') : '';
        const extractedEndHour = parsedEndTime
          ? parsedEndTime.format('hh')
          : '';
        const extractedEndMinutes = parsedEndTime
          ? parsedEndTime.format('mm')
          : '';
        const endAmPm = parsedEndTime ? parsedEndTime.format('A') : '';
        setStartDate(extractedStartDate);
        setStartTime({
          hour: extractedStartHour,
          minute: extractedStartMinutes,
          ampm: startAmPm,
        });
        setEndTime({
          hour: extractedEndHour,
          minute: extractedEndMinutes,
          ampm: endAmPm,
        });
        const partnerName =
          partnerDetail && partnerDetail.name ? partnerDetail.name : '';
        const partnerId =
          partnerDetail && partnerDetail.id ? partnerDetail.id : '';
        const secondPartnerName =
          secondPartnerDetail && secondPartnerDetail.name
            ? secondPartnerDetail.name
            : '';
        const secondPartnerId =
          secondPartnerDetail && secondPartnerDetail.id
            ? secondPartnerDetail.id
            : '';
        setPartnerNameStr(`${partnerId} - ${partnerName}`);
        setSelectedStatus(detailObj.Status);
        setUserDataObject(detailObj);
        setMachineDetail(machineDetails);
        setSecondPartnerStr(`${secondPartnerId} - ${secondPartnerName}`);
        const callerName =
          bookingDetail && bookingDetail.callerName
            ? bookingDetail.callerName
            : '';
        const callerPhone =
          bookingDetail && bookingDetail.callerPhone
            ? bookingDetail.callerPhone
            : '';
        setCallerDetails({
          callerName,
          callerPhone,
        });

        const logs =
          response.data.userLogs && response.data.userLogs.length > 0
            ? response.data.userLogs
            : [];
        setUserLogs(logs);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAllotDate = (date) => {
    const reqBody = {
      id: params.sessionScheduleId,
      date,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/booking/allocate-date`,
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
    if (isPackage) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/v1/admin/booking/get-package-session-status/${params.sessionScheduleId}`,
          {
            headers: {
              Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
              token: getToken(),
            },
          },
        )
        .then((response) => {
          setPackageSessionData(response?.data?.packageSessionData);
        })
        .catch((err) => console.log(err));
    }
  }, [isPackage]);

  const deleteFirstTherapistHandler = (data) => {
    const body = {
      sessionScheduleId: params.sessionScheduleId,
      partnerId: Number(data),
      partnerCount: 1,
    };

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/booking/deallocate-therapist`,
        body,
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

  const deleteSecondTherapistHandler = (data) => {
    const body = {
      sessionScheduleId: params.sessionScheduleId,
      partnerId: Number(data),
      partnerCount: 2,
    };

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/booking/deallocate-therapist`,
        body,
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

  function operateOnTimes(time1, time2) {
    const time1Moment = moment(time1, 'HH:mm');
    const [hours2, minutes2] = time2.split(':').map(Number);
    const isNegative = hours2 < 0 || minutes2 < 0;
    const time2Moment = moment(time2.replace('-', ''), 'HH:mm');
    const result = isNegative
      ? time1Moment
          .subtract(time2Moment.hours(), 'hours')
          .subtract(time2Moment.minutes(), 'minutes')
      : time1Moment
          .add(time2Moment.hours(), 'hours')
          .add(time2Moment.minutes(), 'minutes');
    const formattedTime = result.format('HH:mm');
    return formattedTime;
  }
  var body;
  if (userDataObject?.['Booking Time']) {
    body = {
      slotDate: userDataObject?.['Booking Date'],
      slotTime: {
        startTime: userDataObject?.['Booking Time'],
        endTime: addHoursToTime(userDataObject?.['Booking Time'], 0, 30),
        // endTime: operateOnTimes(userDataObject?.["Booking Time"], "01:00")
      },
      blockedSlotTime: {
        startTime: subtractHoursFromTime(
          userDataObject?.['Booking Time'],
          1,
          0,
        ),
        // startTime: operateOnTimes(userDataObject?.["Booking Time"], "-01:00"),
        // endTime: userDataObject?.["Booking Time"]
        endTime: subtractHoursFromTime(userDataObject?.['Booking Time'], 0, 30),
      },
      city: bookingData?.bookingDetail?.addressRegionalCity,
      productId: bookingData?.bookingDetail?.productId,
      clientLat: bookingData?.bookingDetail?.latitude,
      clientLong: bookingData?.bookingDetail?.longitude,
      sessionScheduleId: bookingData?.bookingDetail?.sessionScheduleId,
      previousTherapistId: bookingData?.partnerDetail?.id,
      previousMachineId: bookingData?.machineDetail?.id,
      clientId: bookingData?.bookingDetail?.userId,
      therapistId: bookingData?.partnerDetail?.id,
      machineId: bookingData?.machineDetail?.id,
      therapistCenterId:bookingData?.partnerDetail?.center_id,
      machineCenterId:bookingData?.machineDetail?.center_id
    };
  }

  // useEffect(() => {
  //   if (body?.slotTime?.startTime) {
  //     dispatch(fetchAvailableTherapist(body));
  //   }
  // }, [body]);

  const schedulerAllowedCity = [
    'Delhi',
    'Noida',
    'Gurgaon',
    'Pune',
    'Mumbai',
    'Hyderabad',
    'Bangalore',
    'Indore',
    'Ahmedabad',
    'Ludhiana',
    'Chandigarh',
  ];

  return (
    <div>
      {/* Render the UserDetailsBox component with the userDataObject */}
      {Object.keys(userDataObject).length > 0 ? (
        <UserDetailsComponent
          data={userDataObject}
          machineDetails={machineDetail}
        />
      ) : (
        ''
      )}

      <Grid item xs={12} md={6}>
        <Grid container spacing={2} mt={4}>
          {!bookingData?.bookingDetail?.isPackage &&
          bookingData?.bookingDetail?.longitude !== '' &&
          bookingData?.bookingDetail?.latitude !== '' &&
          bookingData?.bookingDetail?.longitude &&
          bookingData?.bookingDetail?.latitude &&
          schedulerAllowedCity.includes(
            bookingData?.bookingDetail?.addressRegionalCity,
          ) ? (
            <Grid item xs={6}>
              <AllotTherapistComponent
                handleAllotTherapist={handleSubmitAllotTherapist}
                partnerNameStr={partnerNameStr ? partnerNameStr : ''}
                secondPartnerStr={secondPartnerStr ? secondPartnerStr : ''}
                startDate={startDate ? startDate : ''}
                startTime={startTime ? startTime : ''}
                endTime={endTime ? endTime : ''}
                isDisabled={
                  userDataObject.Status === 'COMPLETED' ||
                  userDataObject.Status === 'PAID' ||
                  userDataObject.Status === 'CANCELLED'
                }
                deleteFirstTherapistHandler={deleteFirstTherapistHandler}
                deleteSecondTherapistHandler={deleteSecondTherapistHandler}
                reAllocateBody={body}
                therapist={userDataObject}
              />
            </Grid>
          ) : (
            <Grid item xs={6}>
              <AllotTherapistV1
                handleAllotTherapist={handleSubmitAllotTherapist}
                partnerNameStr={partnerNameStr ? partnerNameStr : ''}
                secondPartnerStr={secondPartnerStr ? secondPartnerStr : ''}
                startDate={startDate ? startDate : ''}
                startTime={startTime ? startTime : ''}
                endTime={endTime ? endTime : ''}
                isDisabled={
                  userDataObject.Status === 'COMPLETED' ||
                  userDataObject.Status === 'PAID' ||
                  userDataObject.Status === 'CANCELLED'
                }
                deleteFirstTherapistHandler={deleteFirstTherapistHandler}
                deleteSecondTherapistHandler={deleteSecondTherapistHandler}
                reAllocateBody={body}
                therapist={userDataObject}
              />
            </Grid>
          )}
          {!bookingData?.bookingDetail?.isPackage &&
            bookingData?.bookingDetail?.longitude !== '' &&
            bookingData?.bookingDetail?.latitude !== '' &&
            bookingData?.bookingDetail?.longitude &&
            bookingData?.bookingDetail?.latitude &&
            schedulerAllowedCity.includes(
              bookingData?.bookingDetail?.addressRegionalCity,
            ) && (
              <Grid item xs={12} md={6}>
                <AllotMachine
                  body={body}
                  isDisabled={
                    userDataObject.Status === 'COMPLETED' ||
                    userDataObject.Status === 'PAID' ||
                    userDataObject.Status === 'CANCELLED'
                  }
                />
              </Grid>
            )}
          {/* <Grid item xs={12} md={6}>
            <UpdateStatusComponent
              updateStatusHandler={handleStatusUpdate}
              selectedStatus={selectedStatus}
            />
          </Grid> */}
        </Grid>
        <Grid container spacing={2} mt={4}>
          {bookingData?.bookingDetail?.longitude !== '' &&
          !bookingData?.bookingDetail?.isPackage &&
          bookingData?.bookingDetail?.latitude !== '' &&
          bookingData?.bookingDetail?.longitude &&
          bookingData?.bookingDetail?.latitude &&
          schedulerAllowedCity.includes(
            bookingData?.bookingDetail?.addressRegionalCity,
          ) ? (
            <Grid item xs={6}>
              <AllotDateV2
                handleAllotDate={handleAllotDate}
                body={body}
                isDisabled={
                  userDataObject.Status === 'COMPLETED' ||
                  userDataObject.Status === 'PAID' ||
                  userDataObject.Status === 'CANCELLED'
                }
              />
            </Grid>
          ) : (
            <Grid item xs={6}>
              <AllotDate
                handleAllotDate={handleAllotDate}
                body={body}
                isDisabled={
                  userDataObject.Status === 'COMPLETED' ||
                  userDataObject.Status === 'PAID' ||
                  userDataObject.Status === 'CANCELLED'
                }
              />
            </Grid>
          )}
          {/* <Grid item xs={12} md={6}>
            <CommentBox />
          </Grid> */}
          {/* {bookingData?.bookingDetail?.latitude !== "" && bookingData?.bookingDetail?.longitude !== "" && bookingData?.bookingDetail?.longitude && bookingData?.bookingDetail?.latitude && schedulerAllowedCity.includes(bookingData?.bookingDetail?.addressCity) ?
            <Grid item xs={12} md={6}>
              <UpdateStatusComponentV2
                updateStatusHandler={handleStatusUpdate}
                selectedStatus={selectedStatus}
                body={body}
              />
            </Grid>
            : <Grid item xs={12} md={6}>
              <UpdateStatusComponent
                updateStatusHandler={handleStatusUpdate}
                selectedStatus={selectedStatus}
                body={body}
              />
            </Grid>} */}
          {/* {bookingData?.bookingDetail?.isPackage ?

            <>
              <Grid item xs={12} md={6}>
                <UpdateStatusComponentPackage
                  updateStatusHandler={updatePackageSessionStatus}
                  packageSessionData={packageSessionData}
                  sessionScheduleId={params.sessionScheduleId}
                />
              </Grid>
            </>
            : (
              bookingData?.bookingDetail?.latitude !== "" &&
                bookingData?.bookingDetail?.longitude !== "" &&
                bookingData?.bookingDetail?.longitude &&
                bookingData?.bookingDetail?.latitude &&
                schedulerAllowedCity.includes(bookingData?.bookingDetail?.addressCity) ? (
                <Grid item xs={12} md={6}>
                  <UpdateStatusComponentV2
                    updateStatusHandler={handleStatusUpdate}
                    selectedStatus={selectedStatus}
                    body={body}
                  />
                </Grid>
              ) : (
                <Grid item xs={12} md={6}>
                  <UpdateStatusComponent
                    updateStatusHandler={handleStatusUpdate}
                    selectedStatus={selectedStatus}
                    body={body}
                  />
                </Grid>
              )
            )} */}
          {bookingData?.bookingDetail?.isPackage ? (
            <>
              <Grid item xs={12} md={6}>
                <UpdateStatusComponentPackage
                  updateStatusHandler={updatePackageSessionStatus}
                  packageSessionData={packageSessionData}
                  sessionScheduleId={params.sessionScheduleId}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <UpdateStatusComponent
                  updateStatusHandler={handleStatusUpdate}
                  selectedStatus={selectedStatus}
                  body={body}
                />
              </Grid>
            </>
          ) : bookingData?.bookingDetail?.latitude !== '' &&
            bookingData?.bookingDetail?.longitude !== '' &&
            bookingData?.bookingDetail?.longitude &&
            bookingData?.bookingDetail?.latitude &&
            schedulerAllowedCity.includes(
              bookingData?.bookingDetail?.addressRegionalCity,
            ) ? (
            <Grid item xs={12} md={6}>
              <UpdateStatusComponentV2
                updateStatusHandler={handleStatusUpdate}
                selectedStatus={selectedStatus}
                body={body}
                isDisabled={userDataObject.Status === 'COMPLETED'}
              />
            </Grid>
          ) : (
            <Grid item xs={12} md={6}>
              <UpdateStatusComponent
                updateStatusHandler={handleStatusUpdate}
                selectedStatus={selectedStatus}
                body={body}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container spacing={2} mt={4}>
          <Grid item xs={6}>
            <CallerBox callerDetails={callerDetails}  isDisabled={userDataObject.Status === 'COMPLETED'}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <CommentBox 
             isDisabled={userDataObject.Status === 'COMPLETED'}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} mt={4}>
          <BookingComments  sessionScheduleId={params.sessionScheduleId}/>
        </Grid>
        <Grid item xs={12} md={6} mt={4}>
          <PaymentHistory sessionScheduleId={params.sessionScheduleId} />
        </Grid>
        <Grid item xs={12} md={6} mt={4}>
          <UserLogs userLogs={userLogs} />
        </Grid>
      </Grid>
    </div>
  );
};

export default BookingDetails;

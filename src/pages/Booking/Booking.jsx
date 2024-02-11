import React, { useEffect, useState } from 'react';
import TableComponent from '../../components/common/TableComponent/TableComponent';
import './Booking.style.css';
import SearchComponent from '../../components/common/SearchComponent/SearchComponent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '../../store/actions/booking.action';
import LoaderComponent from '../../components/common/LoaderComponent/LoaderComponent';
import { useNavigate } from 'react-router-dom';
import { splitDateTime } from '../../utils';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Booking = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let bookingList = useSelector((state) => state.booking.bookingList.bookings);
  let pageCount = useSelector((state) => state.booking.bookingList?.totalPages);
  let totalBooking = useSelector((state) => state.booking.bookingList?.totalRecords)
  bookingList = bookingList?.map((data) => {
    const formattedDate = splitDateTime(data.appointmentAt);

    return {
      'Id': data?.sessionSchedulesId,
      sessionId: data.sessionId ? data.sessionId : null,
      Name: data.name ? data.name : '',
      'client Id': data?.clientId,
      'Gender': data?.gender,
      'Phone Number': data.phoneNumber,
      City: data.city ? data.city : '',
      'Service Name': data.productName ? data.productName : '',
      'Booking Date': formattedDate.date,
      'Booking Time': formattedDate.time,
      'Formatted Address': data.formattedAddress ? data.formattedAddress : '',
      Total: data.total ? data.total : '',
      Count: data.count ? data.count : '',
      Status: data.status ? data.status : '',
      'Partner Name': data.partnerName ? data.partnerName : "Not Assigned",
      map: data.Map ? data.Map : '',
    };
  });

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const storedStartDate = sessionStorage.getItem('bookingStartDate') || today.toISOString().split('T')[0];
  const storedEndDate = sessionStorage.getItem('bookingEndDate') || tomorrow.toISOString().split('T')[0];
  const storedPage = sessionStorage.getItem('bookingPage') || '1';
  const [page, setPage] = useState(storedPage);
  const handlePageChange = (event, value) => {
    setPage(value.toString());
  };

  const [startDate, setStartDate] = useState(storedStartDate);
  const [endDate, setEndDate] = useState(storedEndDate);

  const handleDateChange = (event) => {
    if (event.target.name === 'startDate') {
      setStartDate(event.target.value);
    } else if (event.target.name === 'endDate') {
      setEndDate(event.target.value);
    }
  };

  const handleBookingDetail = (details) => {
    navigate(`/booking-details/${details.sessionId}`);
  };

  const stringifiedUser = localStorage.getItem('userData');
  const userData = stringifiedUser ? JSON.parse(stringifiedUser) : null;
  const concentrixUser =
    userData && userData.user && userData.user.concentrixUser
      ? userData.user.concentrixUser
      : false;

  const clearSpecificSessionData = () => {
    sessionStorage.removeItem('bookingStartDate');
    sessionStorage.removeItem('bookingEndDate');
    sessionStorage.removeItem('bookingPage');
  };

  useEffect(() => {
    window.addEventListener('beforeunload', clearSpecificSessionData);
    return () => {
      window.removeEventListener('beforeunload', clearSpecificSessionData);
    };
  }, []);

  useEffect(() => {
    sessionStorage.setItem('bookingStartDate', startDate);
    sessionStorage.setItem('bookingEndDate', endDate);
    sessionStorage.setItem('bookingPage', page);
    dispatch(fetchBookings({ startDate: startDate, endDate: endDate, page: page, }));
  }, [dispatch, startDate, endDate, page]);

  return concentrixUser ? (
    <h1>You do not have access for this section</h1>
  ) : (
    <div>
      <h3>All Bookings</h3>
      <div className="container">
        <div>
          <SearchComponent />
        </div>

        <div className="date-rage">
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={handleDateChange}
          />
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={handleDateChange}
          />
        </div>
      </div>
      {bookingList?.length > 0 ? (
        <>
          <h4 style={{ textAlign: 'right', marginBottom: '7px', padding: '5px' }}>Total bookings on the selected date:{totalBooking}</h4>
          <TableComponent
            data={bookingList}
            hiddenFields={[
              'orderId',
              'addressType',
              'addressPlaceId',
              'productSessionId',
              'isConsent',
              'productImage',
              'sessionId',
              'orderDetailId',
              'productId',
              'addressCompoundCode',
              'addressArea',
              'userId',
              'appointmentAt',
            ]}
            viewBookingButton={'view'}
            bookingDetails={handleBookingDetail}
          />
          <div className="incentiv-pagination" style={{ marginTop: "1rem" }}>
            <Stack spacing={3}>
              <Pagination
                count={pageCount}
                color="primary"
                onChange={handlePageChange}
                defaultPage={parseInt(page)}
              />
            </Stack>
          </div>
        </>
      ) : (
        <LoaderComponent />
      )}
    </div>
  );
};

export default Booking;

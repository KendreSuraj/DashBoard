import React, { useEffect, useState } from 'react';
import TableComponent from '../../components/common/TableComponent/TableComponent';
import './Booking.style.css';
import SearchComponent from '../../components/common/SearchComponent/SearchComponent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '../../store/actions/booking.action';
import LoaderComponent from '../../components/common/LoaderComponent/LoaderComponent';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const Booking = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let bookingList = useSelector((state) => state.booking.bookingList);

  bookingList = bookingList?.map((data) => {
    const newDate = moment(data.appointmentAt);
    return {
      Name: data.name ? data.name : '',
      'Phone Number': data.phoneNumber,
      City: data.addressCity ? data.addressCity : '',
      'Service Name': data.productName ? data.productName : '',
      'Booking Date': newDate.format('YYYY-MM-DD'),
      'Booking Time': newDate.format('hh:mm A'),
      Building: data.building ? data.building : '',
      'Formatted Address': data.formattedAddress ? data.formattedAddress : '',
      'Product Price': data.productPrice ? data.productPrice : '',
      Discount: data.discount ? data.discount : '',
      'Coupon Discount': data.couponDiscount ? data.couponDiscount : '',
      Total: data.total ? data.total : '',
      Count: data.count ? data.count : '',
      'Pin Code': data.addressPostalCode ? data.addressPostalCode : '',
      Status: data.status ? data.status : '',
      sessionId: data.sessionId ? data.sessionId : null,
      map: data.Map ? data.Map : '',
    };
  });

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [startDate, setStartDate] = useState(today.toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(tomorrow.toISOString().split('T')[0]);

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
  useEffect(() => {
    dispatch(fetchBookings({ startDate: startDate, endDate: endDate }));
  }, [dispatch, startDate, endDate]);

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
        <TableComponent
          data={bookingList}
          hiddenFields={[
            'orderId',
            'addressType',
            'addressPlaceId',
            'productSessionId',
            'isConsent',
            'productImage',
            'sessionScheduleId',
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
      ) : (
        <LoaderComponent />
      )}
    </div>
  );
};

export default Booking;

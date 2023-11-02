import React, { useEffect, useState } from 'react';
import TableComponent from '../../components/common/TableComponent/TableComponent';
import './Booking.style.css';
import SearchComponent from '../../components/common/SearchComponent/SearchComponent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '../../store/actions/booking.action';
import LoaderComponent from '../../components/common/LoaderComponent/LoaderComponent';

const Booking = () => {
  const dispatch = useDispatch();
  const bookingList = useSelector((state) => state.booking.bookingList);

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

  useEffect(() => {
    dispatch(fetchBookings({ startDate: startDate, endDate: endDate }));
  }, [dispatch, startDate, endDate]);

  return (
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
          ]}
        />
      ) : (
        <LoaderComponent />
      )}
    </div>
  );
};

export default Booking;

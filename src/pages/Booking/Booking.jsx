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
            'productImage',
            'sessionScheduleId',
            'sessionId',
            'orderDetailId',
            'productId',
            'addressCompoundCode',
            'addressArea',
            'userId'
          ]}
        />
      ) : (
        <LoaderComponent />
      )}
    </div>
  );
};

export default Booking;
// {"addressArea":"G Block,Kailash Hills,East of Kailash","addressCity":"New Delhi","addressCompoundCode":"H756+P2P New Delhi, Delhi, India","addressPlaceId":"ChIJvaVrer_jDDkR5eVNvsWBP_k","addressPostalCode":"110065","addressState":"Delhi","addressType":"home","appointmentAt":"2023-12-30T18:00:03.000Z","building":"B 72/2, B block ,East of Kailash, New Delhi -110065","count":1,"couponDiscount":"0","discount":"0","formattedAddress":"B 72/2, B block ,East of Kailash, New Delhi -110065, G Block, Kailash Hills, East of Kailash, New Delhi, Delhi 110065, India","isConsent":null,"name":"prachi","orderDetailId":1637,"orderId":"f70db086-fe2f-4e28-995d-d10b12bcd8a0","phoneNumber":"8588060887","productId":122,"productImage":"https://avataarv2content.s3.ap-south-1.amazonaws.com/images/new+thumbnails/vithair+female+t.png","productName":"VitHair Trichology","productPrice":"4200","productSessionId":303,"sessionId":1638,"sessionScheduleId":1408,"status":"PENDING","total":"4200","userId":1702}

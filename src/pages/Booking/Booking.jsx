import React from 'react';
import TableComponent from '../../components/common/TableComponent/TableComponent';
import './Booking.style.css';
import SearchComponent from '../../components/common/SearchComponent/SearchComponent';

const Booking = () => {
  const data = [];
  return (
    <div>
      <h3>All Bookings</h3>
      <div className="container">
        <div>
          <SearchComponent />
        </div>
        <div className="date-rage">
          <input type="date" />
          <input type="date" />
        </div>
      </div>
      <TableComponent data={data} />
    </div>
  );
};

export default Booking;

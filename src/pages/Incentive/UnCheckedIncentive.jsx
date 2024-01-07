import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIncentive } from '../../store/actions/incentive.action';
import TableComponent from '../../components/common/TableComponent/TableComponent';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

const UnCheckedIncentive = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uncheckedIncentiveList = useSelector(
    (state) => state.incentive.incentiveList,
  );
  const today = new Date();
  const tomorrow = new Date();
  const pageCount = uncheckedIncentiveList?.totalPages;
  tomorrow.setDate(tomorrow.getDate() + 1);

  const storedStartDate = sessionStorage.getItem('startDate') || today.toISOString().split('T')[0];
  const storedEndDate = sessionStorage.getItem('endDate') || tomorrow.toISOString().split('T')[0];
  const storedPage = sessionStorage.getItem('page') || '1';

  const [startDate, setStartDate] = useState(storedStartDate);
  const [endDate, setEndDate] = useState(storedEndDate);
  const [page, setPage] = useState(storedPage);
  const [filteredList, setFilteredList] = useState([])
  const [selected, setSelected] = useState(false)

  const handleViewDetails = (details) => {
    navigate('/viewuncheckedincentive', { state: { details } });
  };

  const handleDateChange = (event) => {
    setFilteredList([])
    document.getElementById('filterBookingsDropdown').value = "";
    setSelected(false)
    if (event.target.name === 'startDate') {
      setStartDate(event.target.value);
    } else if (event.target.name === 'endDate') {
      setEndDate(event.target.value);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value.toString());
    setSelected(false)
    setFilteredList([])
    document.getElementById('filterBookingsDropdown').value = "";
  };

  const handleSelectChanges = (e) => {
    setSelected(e.target.value === "" ? false : true)
    let selectedList = uncheckedIncentiveList?.bookings.filter(x => x.status === e.target.value)
    setFilteredList([...selectedList])
  }

  const clearSpecificSessionData = () => {
    sessionStorage.removeItem('startDate');
    sessionStorage.removeItem('endDate');
    sessionStorage.removeItem('page');
  };
  
  useEffect(() => {
    window.addEventListener('beforeunload', clearSpecificSessionData);
    return () => {
      window.removeEventListener('beforeunload', clearSpecificSessionData);
    };
  }, []);

  useEffect(() => {
    sessionStorage.setItem('startDate', startDate);
    sessionStorage.setItem('endDate', endDate);
    sessionStorage.setItem('page', page);
    dispatch(
      fetchIncentive({
        startDate: startDate,
        endDate: endDate,
        type: 'unchecked',
        page: page,
      }),
    );
  }, [dispatch, startDate, endDate, page]);

  return (
    <div>
      <h3 className="incentive-heading">Unchecked Incentive</h3>
      <div className='filter-bookings'>
        <select id="filterBookingsDropdown" onChange={handleSelectChanges}>
          <option value="">Filter Bookings</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="SCHEDULED">SCHEDULED</option>
          <option value="SESSION_START">SESSION START</option>
          <option value="POSTPONED">POSTPONED</option>
        </select>
      </div>
      <div className="incentive-date-range">
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

      <TableComponent
        data={selected || filteredList.length > 0 ? filteredList : uncheckedIncentiveList?.bookings}
        hiddenFields={[
          'order_id',
          'order_detail_id',
          'address_id',
          'product_id',
          'gender',
          'compound_code',
          'area',
          'state',
          'place_id',
          'addressId',
          'sessionSchedulesId',
          'sessionId',
          'clientId',
          'orderid',
          'orderDetailId',
          'placeId',
          'productId',
          'partnerId',
        ]}
        viewButton={'view'}
        viewDetails={handleViewDetails}
      />

      <div className="incentiv-pagination">
        <Stack spacing={3}>
          <Pagination
            count={pageCount}
            color="primary"
            onChange={handlePageChange}
            defaultPage={parseInt(page)}
          />
        </Stack>
      </div>
    </div>
  );
};

export default UnCheckedIncentive;

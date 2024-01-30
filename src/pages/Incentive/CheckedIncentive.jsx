import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIncentive } from '../../store/actions/incentive.action';
import TableComponent from '../../components/common/TableComponent/TableComponent';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import './Incentive.style.css';

const CheckedIncentive = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkedIncentiveList = useSelector(
    (state) => state.incentive.incentiveList,
  );
  const today = new Date();
  const tomorrow = new Date();
  const pageCount = checkedIncentiveList?.totalPages;
  tomorrow.setDate(tomorrow.getDate() + 1);

  const storedStartDate = sessionStorage.getItem('checkedStartDate') || today.toISOString().split('T')[0];
  const storedEndDate = sessionStorage.getItem('checkedEndDate') || tomorrow.toISOString().split('T')[0];
  const storedPage = sessionStorage.getItem('checkedpage') || '1';

  const [startDate, setStartDate] = useState(storedStartDate);
  const [endDate, setEndDate] = useState(storedEndDate);
  const [page, setPage] = useState(storedPage);

  const handleViewDetails = (details) => {
    navigate('/viewcheckedincentive', { state: { details } });
  };

  const handleDateChange = (event) => {
    if (event.target.name === 'startDate') {
      setStartDate(event.target.value);
    } else if (event.target.name === 'endDate') {
      setEndDate(event.target.value);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value.toString());
  };

  const clearSpecificSessionData = () => {
    sessionStorage.removeItem('checkedStartDate');
    sessionStorage.removeItem('checkedEndDate');
    sessionStorage.removeItem('checkedPage');
  };

  useEffect(() => {
    window.addEventListener('beforeunload', clearSpecificSessionData);
    return () => {
      window.removeEventListener('beforeunload', clearSpecificSessionData);
    };
  }, []);

  useEffect(() => {
    sessionStorage.setItem('checkedStartDate', startDate);
    sessionStorage.setItem('checkedEndDate', endDate);
    sessionStorage.setItem('checkedPage', page);
    dispatch(
      fetchIncentive({
        startDate: startDate,
        endDate: endDate,
        type: 'checked',
        page: page,
      }),
    );
  }, [dispatch, startDate, endDate, page]);

  return (
    <div>
      <h3 className="incentive-heading">Checked Incentive</h3>
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
        data={checkedIncentiveList?.bookings}
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
          />
        </Stack>
      </div>
    </div>
  );
};

export default CheckedIncentive;

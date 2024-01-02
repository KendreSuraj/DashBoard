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

  const [startDate, setStartDate] = useState(today.toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(tomorrow.toISOString().split('T')[0]);
  const [page, setPage] = useState('1');

  const handleViewDetails = (details) => {
    navigate('/viewuncheckedincentive', { state: { details } });
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

  useEffect(() => {
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
      <div className="incentive-date-rage">
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
        data={uncheckedIncentiveList?.bookings}
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

export default UnCheckedIncentive;

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TableComponent from '../../components/common/TableComponent/TableComponent';
import { fetchIncentiveSeteps } from '../../store/actions/incentive.action';

export const ViewCheckedIncentive = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const incentiveDetails = location.state?.details;
  const { sessionId, sessionSchedulesId, partnerId, productId } =
    incentiveDetails || {};
  const incentiveSteps = useSelector((state) => state.incentive.incentiveSteps);

  useEffect(() => {
    dispatch(
      fetchIncentiveSeteps({
        sessionId,
        sessionSchedulesId,
        partnerId,
        productId,
      }),
    );
  }, [dispatch, sessionId, sessionSchedulesId, partnerId, productId]);

  return (
    <div>
      <h3>Incentive Details</h3>
      <TableComponent data={[incentiveDetails]} />
      <h3>All Steps with Incentive</h3>
      <TableComponent data={incentiveSteps} />
    </div>
  );
};

import React, { useEffect } from 'react';
import TableComponent from '../../components/common/TableComponent/TableComponent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPartner } from '../../store/actions/partner.action';
import LoaderComponent from '../../components/common/LoaderComponent/LoaderComponent';

const Partner = () => {
  const dispatch = useDispatch();
  const partnerList = useSelector((state) => state.partner.partnerList);

  useEffect(() => {
    dispatch(fetchPartner());
  }, [dispatch]);

  return (
    <div>
      <h3>All Partner List</h3>
      {partnerList?.length > 0 ? (
        <TableComponent data={partnerList} hiddenFields={['partner_id']} />
      ) : (
        <LoaderComponent />
      )}
    </div>
  );
};

export default Partner;

import React, { useEffect } from 'react';
import TableComponent from '../../components/common/TableComponent/TableComponent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPartner } from '../../store/actions/partner.action';
import LoaderComponent from '../../components/common/LoaderComponent/LoaderComponent';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

const Partner = () => {
  const dispatch = useDispatch();
  const partnerList = useSelector((state) => state.partner.partnerList);
  const stringifiedUser = localStorage.getItem("userData")
  const userData = stringifiedUser ? JSON.parse(stringifiedUser) : null
  const concentrixUser = userData && userData.user && userData.user.concentrixUser ? userData.user.concentrixUser : false
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchPartner());
  }, [dispatch]);

  return (
    concentrixUser ? <h1>You do not have access for this</h1> : <div>
      {partnerList?.length > 0 ? (
        <TableComponent
         data={partnerList}
         hiddenFields={['partner_id']} 
        />
      ) : (
        <LoaderComponent />
      )}
    </div>
  );
};

export default Partner;

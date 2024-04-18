import React, { useEffect } from 'react'
import TableComponent from '../../components/common/TableComponent/TableComponent'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCenter } from '../../store/actions/center.action';

const CenterListing = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let centerList = useSelector(state => state.center?.centerList?.centers)
  console.log("see center list ------->>>>>>>>", centerList)
     
  centerList = centerList?.map((data) => {
    return {
      'Id':data?.id,
      'Center Phone':data?.phone,
      'center Name':data?.name ,
      'Admin Name': data?.adminName,
      "Admin Phone": data?.adminPhone,
      'Admin User Id': data?.adminUserId,
      'City Id': data.cityId,
      'Start Time':data?.timings?.startTime,
      'End Time':data?.timings?.endTime,
    };
  });
  
  const handleEdit = (data) => {
    if (data) {
      navigate("/addedit-center", {
        state: { data: { data } },
      });
    }
  };
  useEffect(() => {
    dispatch(fetchCenter())
  }, [dispatch])

  return (
    <div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: "30px" }}>
        <h3 style={{ margin: '0 auto' }}>All Centers</h3>
        <Button variant="contained" color="primary" onClick={() => navigate("/addedit-center")}>Add Center</Button>
      </div>
      <TableComponent data={centerList}
        hiddenFields={["timings"]}
        viewButton={<EditIcon />}
        viewDetails={handleEdit}
      />
    </div>
  )
}

export default CenterListing
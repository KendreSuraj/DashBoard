import React, { useEffect } from 'react'
import TableComponent from '../../components/common/TableComponent/TableComponent'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMachine } from '../../store/actions/machine.action';
import { hasAdminAndSuperAdminAccess } from '../../components/common/UserRolesConfig';
const MachineListing = () => {
  const role = JSON.parse(localStorage.getItem('userData'))?.user?.role;
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let machineList = useSelector(state => state?.machine?.machineList?.machines)
  const handleEdit = (data) => {
    if (data) {
      navigate(`/addedit-machine?id=${data?.id}`, {
        state: {data},
      });
    }
  };
  useEffect(() => {
    dispatch(fetchMachine())
  }, [dispatch])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: "30px" }}>
        <h3 style={{ margin: '0 auto' }}>All Machines</h3>
        {hasAdminAndSuperAdminAccess(role)&&<Button variant="contained" color="primary" onClick={() => navigate("/addedit-machine")}>Add Machine</Button>}
      </div>
      <TableComponent data={machineList}
        hiddenFields={["centerId", "createdAt", "deletedAt", "extra", "id", "lat", "location", "long", "products", "saturdayAvailability", "sundayAvailability", "thursdayAvailability", "tuesdayAvailability", "updatedAt", "wednesdayAvailability", "fridayAvailability", "mondayAvailability"]}
        viewButton={hasAdminAndSuperAdminAccess(role)&&<EditIcon />}
        viewDetails={handleEdit}
      />
    </div>
  )
}

export default MachineListing
import React, { useEffect } from 'react'
import TableComponent from '../../components/common/TableComponent/TableComponent'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTherapist } from '../../store/actions/therapist.action';

const TherapistList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let therapistList = useSelector(state => state?.therapist?.therapistList?.therapists)
  console.log("See therapist------->>>>",therapistList)
  const handleEdit = (data) => {
    if (data) {
      navigate("/addedit-therapist", {
        state: { data: { data } },
      });
    }
  };
  useEffect(() => {
    dispatch(fetchTherapist())
  }, [dispatch])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: "30px" }}>
        <h3 style={{ margin: '0 auto' }}>All  Therapist</h3>
        <Button variant="contained" color="primary" onClick={() => navigate("/addedit-therapist")}>Add Therapist</Button>
      </div>
      <TableComponent data={therapistList}
        hiddenFields={["centerId", "createdAt", "deletedAt", "extra", "id", "lat", "location", "long", "products", "saturdayAvailability", "sundayAvailability", "thursdayAvailability", "tuesdayAvailability", "updatedAt", "wednesdayAvailability", "fridayAvailability", "mondayAvailability"]}
        viewButton={<EditIcon />}
        viewDetails={handleEdit}
      />
    </div>
  )
}

export default TherapistList

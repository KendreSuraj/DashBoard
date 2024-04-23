import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DropdownWithCheckBox from '../DropdownWithCheckBox/DropdownWithCheckBox';
import './FilterModal.style.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCityList,
  fetchProductList,
} from '../../../store/actions/booking.action';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const serviceStatusData = [
  { title: 'PENDING' },
  { title: 'SCHEDULED' },
  { title: 'POSTPONED' },
  { title: 'COMPLETED' },
  { title: 'PAID' },
  { title: 'SESSION_START' },
  { title: 'SESSION_END' },
  { title: 'CANCELLED' },
];

const newCityList=[
  { "title": "Delhi" },
  { "title": "Mumbai" },
  { "title": "Pune" },
  { "title": "Gurgaon" },
  { "title": "Noida" },
  { "title": "Chandigarh" },
  { "title": "Bangalore" },
  { "title": "Hyderabad" },
  { "title": "Ahmedabad" },
  { "title": "Indore" },
  {"title":"Ludhiana"}
]

export default function FilterModal({
  setSelectedCities,
  setSelectedServices,
  setSelectedStatus,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCityList());
    dispatch(fetchProductList());
  }, [dispatch]);

  const cityList = useSelector((state) => state.booking.cityList);
  console.log("see list ,,",cityList)
  const productList = useSelector((state) => state.booking.productList);

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        Add Filters
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Filters
          </Typography>
          <div>
            <Typography id="modal-modal-description" sx={{ mt: 2, mb: 1 }}>
              Select service status
            </Typography>
            <DropdownWithCheckBox
              dropdownLabel={'Select status'}
              data={serviceStatusData}
              setSelectedValues={setSelectedStatus}
            />
          </div>

          <div>
            <Typography id="modal-modal-description" sx={{ mt: 4, mb: 1 }}>
              Select Centers
            </Typography>
            <DropdownWithCheckBox
              dropdownLabel={'Select Centers'}
              data={newCityList}
              setSelectedValues={setSelectedCities}
            />
          </div>

          <div>
            <Typography id="modal-modal-description" sx={{ mt: 4, mb: 1 }}>
              Select services
            </Typography>
            <DropdownWithCheckBox
              dropdownLabel={'Select services'}
              data={productList}
              setSelectedValues={setSelectedServices}
            />
          </div>

          <div className="btnCenter">
            <Button variant="contained" sx={{ mt: 4 }} onClick={handleClose}>
              Apply Filters
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

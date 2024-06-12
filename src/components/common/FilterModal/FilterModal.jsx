import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DropdownWithCheckBox from '../DropdownWithCheckBox/DropdownWithCheckBox';
import './FilterModal.style.css';
import {
  fetchCityList,
  fetchProductList,
} from '../../../store/actions/booking.action';
import { fetchTherapist } from '../../../store/actions/therapist.action';
import { 
  setSelectedCities, 
  setSelectedServices, 
  setSelectedStatus, 
  setSelectedPartners 
} from '../../../store/slices/dashboardStateSlice';

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

export default function FilterModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCityList());
    dispatch(fetchProductList());
    dispatch(fetchTherapist());
  }, [dispatch]);

  const cityList = useSelector((state) => state.booking.cityList);
  const productList = useSelector((state) => state.booking.productList);
  const therapistList = useSelector((state) => state.therapist.therapistList?.therapists);
  const selectedCities = useSelector((state) => state.dashboard.selectedCities);
  const selectedServices = useSelector((state) => state.dashboard.selectedServices);
  const selectedStatus = useSelector((state) => state.dashboard.selectedStatus);
  const selectedPartners = useSelector((state) => state.dashboard.selectedPartners);
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
              data={Array.isArray(serviceStatusData) ? serviceStatusData : []}
              setSelectedValues={(values) => dispatch(setSelectedStatus(values))}
              selectedValues={selectedStatus}
            />
          </div>

          <div>
            <Typography id="modal-modal-description" sx={{ mt: 4, mb: 1 }}>
              Select Centers
            </Typography>
            <DropdownWithCheckBox
              dropdownLabel={'Select Centers'}
              data={Array.isArray(newCityList) ? newCityList : []}
              setSelectedValues={(values) => dispatch(setSelectedCities(values))}
              selectedValues={selectedCities}
            />
          </div>

          <div>
            <Typography id="modal-modal-description" sx={{ mt: 4, mb: 1 }}>
              Select Partner
            </Typography>
            <DropdownWithCheckBox
              dropdownLabel={'Select Partner'}
              data={Array.isArray(therapistList) ? therapistList : []}
              setSelectedValues={(values) => dispatch(setSelectedPartners(values))}
              selectedValues={selectedPartners}
            />
          </div>

          <div>
            <Typography id="modal-modal-description" sx={{ mt: 4, mb: 1 }}>
              Select services
            </Typography>
            <DropdownWithCheckBox
              dropdownLabel={'Select services'}
              data={Array.isArray(productList) ? productList : []}
              setSelectedValues={(values) => dispatch(setSelectedServices(values))}
              selectedValues={selectedServices}
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

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DropdownWithCheckBox from '../DropdownWithCheckBox/DropdownWithCheckBox';
import './FilterModal.style.css';

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

export default function FilterModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            <DropdownWithCheckBox />
          </div>

          <div>
            <Typography id="modal-modal-description" sx={{ mt: 4, mb: 1 }}>
              Select cities
            </Typography>
            <DropdownWithCheckBox />
          </div>

          <div>
            <Typography id="modal-modal-description" sx={{ mt: 4, mb: 1 }}>
              Select services
            </Typography>
            <DropdownWithCheckBox />
          </div>

          <div className="btnCenter">
            <Button variant="contained" sx={{ mt: 4 }}>
              Apply Filters
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

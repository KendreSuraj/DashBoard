
import {
  DialogTitle,
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Box,
    IconButton,
    Typography,
  } from '@material-ui/core';
  import React from 'react';
  import { Close} from '@material-ui/icons';
  
  const ConfirmDialog = ({isOpen, onClose,onConfirm}) => {

    
      const handleClose= ()=> onClose(false);
      const handleConfirm = () => {
        onConfirm();
        onClose(false);
      };

    return (
      <Dialog open={isOpen} 
      maxWidth="sm" fullWidth>
        
        <DialogTitle></DialogTitle>
        <Box
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
        >
          <IconButton>
            <Close onClick={handleClose}/>
          </IconButton>
        </Box>
        <DialogContent>
          <Typography>
            <h4>Are you sure you want to delete this coupon?</h4></Typography>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained" onClick={handleClose}>
            No
          </Button>
          <Button color="secondary" variant="contained" onClick={handleConfirm}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

export default ConfirmDialog
  
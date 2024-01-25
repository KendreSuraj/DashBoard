
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    IconButton,
    Typography,
  } from '@material-ui/core';
  import React from 'react';
  import { Close } from '@material-ui/icons';
  
  const ConfirmDialog = ({isOpen, onClose,onConfirm}) => {

    
      const handleClose= ()=> onClose(false);
      const handleConfirm = () => {
        onConfirm();
        onClose(false);
      };

    return (
      <Dialog open={isOpen} 
      maxWidth="sm" fullWidth>
        <DialogTitle>Confirm the action</DialogTitle>
        <Box position="absolute" top={0} right={0}>
          <IconButton>
            <Close onClick={handleClose}/>
          </IconButton>
        </Box>
        <DialogContent>
          <Typography>some message here</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="secondary" variant="contained" onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

export default ConfirmDialog
  
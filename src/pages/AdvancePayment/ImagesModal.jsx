import React from 'react';
import { Modal, Backdrop, Fade, makeStyles, Typography, Grid, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: '60%',
    maxHeight: '60%',
    minWidth: '60%',
    minHeight: '60%',
    overflowY: 'auto',
    backgroundColor: "#E0E2DA",
    position: 'relative', // For positioning the close icon
    '&::-webkit-scrollbar': {
        display: 'none', // Hide scroll bar for Chrome, Safari and Opera
      },
      '-ms-overflow-style': 'none', // Hide scroll bar for Internet Explorer and Edge
      'scrollbar-width': 'none', // Hide scroll bar for Firefox
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(2),
    backgroundColor: "white",
    minWidth: "29%",
    borderRadius: "8px"
  },
  image: {
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    borderRadius: theme.spacing(1),
  },
  imageName: {
    marginTop: theme.spacing(1),
  },
}));

const ImageModal = ({ open, handleClose, products }) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <IconButton className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" id="transition-modal-title">
            Image Gallery
          </Typography>
          <Grid container spacing={2}>
            {products.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index} className={classes.imageContainer}>
                <img src={product.image} alt={product.name} className={classes.image} />
                <Typography variant="body1" className={classes.imageName}>
                  {product.name}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
};

export default ImageModal;

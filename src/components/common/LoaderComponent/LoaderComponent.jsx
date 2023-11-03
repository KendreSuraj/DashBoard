import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './LoaderComponent.style.css';

const LoaderComponent = () => {
  return (
    <Box className="circular-progress">
      <CircularProgress />
    </Box>
  );
};

export default LoaderComponent;

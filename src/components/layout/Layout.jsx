import React from 'react';
import Header from '../header/Header';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import sizeConfigs from '../../config/sizeConfigs';
import colorConfigs from '../../config/colorConfigs';
import { Box, Toolbar } from '@mui/material';

const Layout = () => (

  <Box sx={{ display: 'flex' }}>
    <Header />

    <Box
      component="nav"
      sx={{
        width: sizeConfigs.sidebar.width,
        flexShrink: 0,
      }}
    >
      <Sidebar />
    </Box>

    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: `calc(100% - ${sizeConfigs.sidebar.width})`,
        minHeight: '100vh',
        backgroundColor: colorConfigs.mainBg,
      }}
    >
      <Toolbar />
      <Outlet />
    </Box>
    
  </Box>
);

export default Layout;

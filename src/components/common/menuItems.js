import React from 'react';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export const menuItems = [
  { name: 'Dashboard', route: '/dashboard', icon: <DashboardIcon /> },
  { name: 'Bookings', route: '/bookings', icon: <StorefrontIcon /> },
  { name: 'Past Bookings', route: '/pastbooking', icon: <MenuBookIcon /> },
];

export const usersProfile = [
  { name: 'Profile', route: '/profile', icon: <AccountCircleIcon /> },
  // { name: 'My Dashboard', route: '/mydashboard', icon: <DashboardIcon /> },
  { name: 'Logout', route: '/logout', icon: <ExitToAppIcon /> },
];

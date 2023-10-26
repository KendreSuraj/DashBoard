import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuDropdown from '../SidebarMenuList/MenuDropdown.jsx';

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const menuItems = [
    { name: 'Dashboard', route: '/dashboard', icon: <DashboardIcon /> },
    { name: 'Bookings', route: '/bookings', icon: <StorefrontIcon /> },
    { name: 'Past Bookings', route: '/pastbooking', icon: <MenuBookIcon /> },
  ];

  const usersProfile = [
    { name: 'Profile', route: '/profile', icon: <AccountCircleIcon /> },
    {
      name: 'User Dashboard',
      route: '/userdashboard',
      icon: <DashboardIcon />,
    },
    { name: 'Logout', route: '/logout', icon: <ExitToAppIcon /> },
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar-nav"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>

          <MenuDropdown
            anchorEl={anchorElNav}
            handleClose={handleCloseNavMenu}
            menuItems={menuItems}
          />
          <div style={{ flexGrow: 1 }} />
          <Tooltip title="Open Profile">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="User Avataar" src="Avataar" />
            </IconButton>
          </Tooltip>
          <MenuDropdown
            anchorEl={anchorElUser}
            handleClose={handleCloseUserMenu}
            menuItems={usersProfile}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;

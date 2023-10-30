import React, { useState } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import colorConfigs from '..//../../src/config/colorConfigs';
import sizeConfigs from '../../../src/config/colorConfigs';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import { usersProfile } from '../common/menuItems.js';
import MenuDropdownComponent from '../common/MenuDropdown/MenuDropdownComponent.jsx';
import SearchComponent from '../common/SearchComponent/SearchComponent';
import './Header.style.css';

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${sizeConfigs.sidebar.width})`,
        ml: sizeConfigs.sidebar.width,
        boxShadow: 'unset',
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color,
      }}
    >
      <Toolbar>
        <Typography className="flex-grow" align="center" variant="h5">
          {/* Avataar Skincare */}
        </Typography>

        <div className="search-component">
          <SearchComponent />
        </div>

        <Tooltip title="Open Profile">
          <IconButton onClick={handleOpenUserMenu}>
            <Avatar alt="Avataar" src="Avataar" />
          </IconButton>
        </Tooltip>

        <MenuDropdownComponent
          anchorEl={anchorElUser}
          handleClose={handleCloseUserMenu}
          menuItems={usersProfile}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;

/* eslint-disable react/prop-types */
import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import './MenuDropdownComponent.style.css';

function MenuDropdownComponent({
  anchorEl,
  handleClose,
  menuItems,
  PaperProps,
}) {
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      PaperProps={PaperProps}
    >

      {menuItems.map((item, index) => (
        <div key={item.name}>
          <MenuItem onClick={handleClose}>
            <Link to={item.route} className="menu-item-link">
              {item.icon}
              <span className="menu-item-text">{item.name}</span>
            </Link>
          </MenuItem>
          {index < menuItems.length - 1 && <Divider />}
        </div>
      ))}
      
    </Menu>
  );
}

export default MenuDropdownComponent;

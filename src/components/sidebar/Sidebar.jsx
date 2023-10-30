import React from 'react';
import { Drawer, List, Toolbar } from '@mui/material';
import logoImage from '../../../src/assets/images/avataar_logo_black.png';
import colorConfigs from '../../config/colorConfigs';
import sizeConfigs from '../../config/sizeConfigs';
import appRoutes from '../../routes/appRoutes';
import SidebarItem from './SidebarItem';
import SidebarItemCollapse from './SidebarItemCollapse.jsx';
import './Sidebar.style.css';

const Sidebar = () => {
  return (
    <Drawer
      className="Drawer"
      variant="permanent"
      sx={{
        width: sizeConfigs.sidebar.width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sizeConfigs.sidebar.width,
          boxSizing: 'border-box',
          borderRight: '0px',
          backgroundColor: colorConfigs.sidebar.bg,
          color: colorConfigs.sidebar.color,
        },
      }}
    >
      <List disablePadding>
        <Toolbar>
          <img className="header-img" src={logoImage} alt="logo" />
        </Toolbar>

        {appRoutes.map((route, index) =>
          route.sidebarProps ? (
            route.child ? (
              <SidebarItemCollapse item={route} key={index} />
            ) : (
              <SidebarItem item={route} key={index} />
            )
          ) : null,
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;

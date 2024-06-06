import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import './MenuDropdownComponent.style.css';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../store/actions/loginAction';
import { resetLoginDetails } from '../../../store/slices/loginSlice';
import { useDispatch } from 'react-redux';

function MenuDropdownComponent({
  anchorEl,
  handleClose,
  menuItems,
  PaperProps,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem('userData')) || {};

  const logoutAndRemoveUser = async () => {
    const logoutResponse = await logoutUser(userData?.user?.id);
    if (logoutResponse?.status?.code === 200) {
      localStorage.removeItem('userData');
      dispatch(resetLoginDetails({}));
      alert(logoutResponse?.status?.message);
      window.location.reload()
      navigate('/');
    }
  };
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
      <Divider />
      {menuItems.map((item, index) => (
        <div key={item.name}>
          <MenuItem onClick={handleClose}>
            <Link to={item.route} className="menu-item-link">
              {item.icon}
              <span className="menu-item-text">{item.name}</span>
            </Link>
          </MenuItem>
          {index < menuItems.length && <Divider />}
        </div>
      ))}
      <MenuItem>
        <ExitToAppIcon />
        &nbsp;
        <span onClick={() => logoutAndRemoveUser()}>Logout</span>
      </MenuItem>
      <Divider />
    </Menu>
  );
}

export default MenuDropdownComponent;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import logoImage from '../../../src/assets/images/avataar_logo_black.png';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const LogIn = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="image-form-container">
        <img src={logoImage} alt="avataar_logo" className="logo-image" />
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your Email"
              required
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-container password-input">
            <label htmlFor="password">Password</label>
            <div className="password-input-inner">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                required
                value={user.password}
                onChange={handleChange}
              />
              <button
                onClick={() => handleShowPassword()}
                className="password-toggle-button"
                type="button"
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </button>
            </div>
          </div>
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;

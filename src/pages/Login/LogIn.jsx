import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.style.css';
import logoImage from '../../../src/assets/images/avataar_logo_black.png';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin } from '../../store/actions/loginAction';

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.login.loginDetails);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
    role: ''
  });

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

  useEffect(() => {
    if (loginUser?.status?.code === 200) {
      localStorage.setItem('userData', JSON.stringify(loginUser));
      navigate('/booking');
    }
  }, [loginUser]);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      navigate('/booking');
    }
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      fetchLogin({
        email: user.email,
        password: user.password,
        role: user.role
      }),
    );
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

          <div className="input-container">
            <label htmlFor="role">Role</label>

            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="SUPER ADMIN">SUPER ADMIN</option>
              <option value="ADMIN">ADMIN</option>
            </select>
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

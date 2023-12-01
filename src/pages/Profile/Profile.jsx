import React from 'react';
import './Profile.style.css';

const Profile = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const LoginUser = userData?.user;
  return (
    <div className="profile-container">
      <div className="value">
        <span className="label">Name:</span>
        {LoginUser.name}
      </div>
      <div className="value">
        <span className="label">Email:</span>
        {LoginUser.email}
      </div>
      <div className="value">
        <span className="label">ID:</span>
        {LoginUser.id}
      </div>
      <div className="value">
        <span className="label">Phone:</span>
        {LoginUser.phone}
      </div>
      <div className="value">
        <span className="label">Role:</span> {LoginUser.role}
      </div>
    </div>
  );
};

export default Profile;

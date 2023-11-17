// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { logoutUser } from '../../store/actions/loginAction';

// const Logout = () => {
//   const navigate = useNavigate();
//   const userData = JSON.parse(localStorage.getItem('userData'));
//   console.log('Test user id ', userData);

//   const logoutAndRemoveUser = async () => {
//     const logout = await logoutUser(userData?.login?.user?.id);
//     console.log('Test logout', logout);
//     if (logout?.status?.code === 200) {
//       const removeUser = localStorage.removeItem('userData');
//       navigate('/');
//       console.log('Test check', removeUser);
//     }
//   };

//   useEffect(() => {
//     logoutAndRemoveUser();
//   }, [userData]);
//   return (
//     <div>
//       <h1>Hello</h1>
//     </div>
//   );
// };

// export default Logout;

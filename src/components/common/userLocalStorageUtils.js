export const getToken = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  return userData.login?.token || null;
};

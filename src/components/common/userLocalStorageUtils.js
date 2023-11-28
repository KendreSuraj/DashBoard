export const getToken = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  return userData?.token || null;
};

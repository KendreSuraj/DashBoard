export const getHoursList = () => {
  const hours = [];
  for (let i = 0; i < 13; i++) {
    const str = i < 10 ? `0${i}` : `${i}`;
    hours.push(str);
  }
  return hours;
};

export const getMinutesList = () => {
  const minutes = [];
  for (let i = 0; i < 60; i++) {
    const str = i < 10 ? `0${i}` : `${i}`;
    minutes.push(str);
  }
  return minutes;
};

export function splitDateTime(dateTimeString) {
  // Split the date and time based on 'T' separator
  if(!dateTimeString){
    return;
  }
  const [datePart, timePart] = dateTimeString.split('T');

  // Extract the date and time components
  const date = datePart;

  // Extract hours and minutes from the time part
  const time = timePart.slice(0, 5); // Extract first 5 characters (hh:mm)

  return { date, time };
}

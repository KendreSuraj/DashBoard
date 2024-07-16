import moment from "moment"
import momentTime from 'moment-timezone'

export const isLoggedIn = () => {
  return localStorage.getItem("token") ? true : false;
};

export const converTimeFormat = (time) => {
  let originalTime = time;
  var dateObj = new Date();

  var timeComponents = originalTime.split(":");
  var hours = parseInt(timeComponents[0]);
  var minutes = parseInt(timeComponents[1].slice(0, 2));

  if (originalTime.includes("PM") && hours < 12) {
    hours += 12; // Convert to 24-hour format if PM
  } else if (originalTime.includes("AM") && hours === 12) {
    hours = 0; // Convert 12AM to 0 hours
  }

  dateObj.setHours(hours);
  dateObj.setMinutes(minutes);

  // Get the formatted time string in the desired format (HH:MM:SS)
  var formattedTime = dateObj.toTimeString().slice(0, 8);

  return formattedTime;
};

export const converDateFormat = (date) => {
  var dateObj = new Date(date);

  var year = dateObj.getFullYear();
  var month = dateObj.getMonth() + 1; // Months are zero-based, so we add 1
  var day = dateObj.getDate();

  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;

  var formattedDate = year + "-" + month + "-" + day;

  return formattedDate;
};

export const FilterSlots = (slotsDate) => {
  for (let i = 0; i < slotsDate.length; i++) {
    const timeArr = slotsDate[i].time;
    const currentDate = moment().format("YYYY-MM-DD");
    const date = slotsDate[i].date
    for (let j = 0; j < timeArr.length; j++) {
      const time = timeArr[j].name;
      // Specify the format explicitly when parsing the time string
      const parsedTime = moment(time, "HH:mm");
      const currentTime = moment();
      if (currentDate === date && parsedTime.isBefore(currentTime)) {
        timeArr[j].disabled = true;
      }
      const futureTime = moment().add(2.5, 'hours').format("HH:mm");
      if (currentDate === date && parsedTime.isAfter(futureTime)) {
        timeArr[j].disabled = false
      }
      const fivePM = moment('17:00', 'HH:mm');
      if (currentDate === date && parsedTime.isAfter(fivePM)) {
        timeArr[j].disabled = true
      }

    }
  }
  return slotsDate;
};


export const changeUTCtoIST = (utcTime) => {
  const utcMoment = moment.utc(utcTime, "YYYY-MM-DD hh:mm A");
  const istMoment = utcMoment.tz('Asia/Kolkata');
  const istTime = istMoment.format('YYYY-MM-DD hh:mm A');
  return istTime
}


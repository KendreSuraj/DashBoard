export function addHoursToTime(time, hoursToAdd, minutesToAdd) {
    // Split the time string into hours and minutes
    let [hours, minutes] = time?.split(':').map(Number);
  
    // Add the hours and minutes
    hours += hoursToAdd;
    minutes += minutesToAdd;
  
    // Handle minutes overflow
    if (minutes >= 60) {
      hours += Math.floor(minutes / 60);
      minutes %= 60;
    }
  
    // Ensure the hours are within 0-23 range
    hours %= 24;
  
    // Format the hours and minutes to ensure leading zeros if necessary
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
  
    // Return the new time string
    return `${hours}:${minutes}`;
  }
  
  export function subtractHoursFromTime(
    time,
    hoursToSubtract,
    minutesToSubtract,
  ) {
    // Split the time string into hours and minutes
    // console.log("see argssss subbbbbbbb",time, hoursToAdd, minutesToAdd)
    let [hours, minutes] = time?.split(':').map(Number);
  
    // Subtract the hours and minutes
    hours -= hoursToSubtract;
    minutes -= minutesToSubtract;
  
    // Handle minutes underflow
    if (minutes < 0) {
      hours -= Math.ceil(Math.abs(minutes) / 60);
      minutes = ((minutes % 60) + 60) % 60;
    }
  
    // Ensure the hours are within 0-23 range
    if (hours < 0) {
      hours += 24;
    }
  
    // Format the hours and minutes to ensure leading zeros if necessary
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
  
    // Return the new time string
    return `${hours}:${minutes}`;
  }
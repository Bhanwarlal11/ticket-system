const moment = require('moment');

// Function to format a date into a readable format
const formatDate = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(date).format(format);
};

// Function to get the difference between two dates in days, hours, or minutes
const getTimeDifference = (startDate, endDate) => {
  const start = moment(startDate);
  const end = moment(endDate);

  const diffInMinutes = end.diff(start, 'minutes');
  const diffInHours = end.diff(start, 'hours');
  const diffInDays = end.diff(start, 'days');

  return {
    minutes: diffInMinutes,
    hours: diffInHours,
    days: diffInDays,
  };
};

// Function to check if a date is expired (e.g., for token expiry)
const isExpired = (date) => {
  const now = moment();
  return now.isAfter(moment(date));
};

// Function to add days to a date
const addDays = (date, days) => {
  return moment(date).add(days, 'days').toDate();
};

// Function to subtract days from a date
const subtractDays = (date, days) => {
  return moment(date).subtract(days, 'days').toDate();
};

module.exports = {
  formatDate,
  getTimeDifference,
  isExpired,
  addDays,
  subtractDays,
};

// function to get next Month
const getNextMonth = (date) => {
  date.setMonth(date.getMonth() + 1);
  return date;
};

exports.getNextMonth = getNextMonth;

// calculating the total number of the months
const getNumberOfMonths = (minStartDate, maxEndDate) => {
  let numberOfMonths =
    maxEndDate.getMonth() -
    minStartDate.getMonth() +
    12 * (maxEndDate.getFullYear() - minStartDate.getFullYear());
  return numberOfMonths;
};

exports.getNumberOfMonths = getNumberOfMonths;

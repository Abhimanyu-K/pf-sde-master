//get min start Date and max end Date
const getMinMaxDates = (data) => {
  //creating a array of dates
  const tempData = data.map((ele) => {
    return ele.startDate;
  });

  //calculating minminum of the dates
  const minStartDate = tempData.reduce((accumulator, currVal) => {
    return accumulator < currVal ? accumulator : currVal;
  });

  //calculating maximum of the days
  const maxEndDate = tempData.reduce((accumulator, currVal) => {
    return accumulator > currVal ? accumulator : currVal;
  });

  return { minStartDate: minStartDate, maxEndDate: maxEndDate };
};

exports.getMinMaxDates = getMinMaxDates;

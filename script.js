// imports fs module for file operations
const fs = require("fs");

// importing the helper functions
const { getNextMonth } = require("./utils/getnextmonth");
const { getMinMaxDates } = require("./utils/getminmaxdates");
const { getNumberOfMonths } = require("./utils/getnumberofmonths");

// loading the json file
const data = require("./2-input.json");

// destructing to get the expenseData and revenueData
const { expenseData, revenueData } = data;

// monthlyexpenses will store the balancesheet
const monthlyexpenses = [];
const solution = [];

// calculating balance sheet for each month
const balanceSheetCalculation = () => {
  revenueData.map((ele) => {
    if (solution[ele["startDate"]]) {
      solution[ele["startDate"]] += ele.amount;
    } else {
      solution[ele["startDate"]] = ele.amount;
    }
  });

  expenseData.map((ele) => {
    if (solution[ele["startDate"]]) {
      solution[ele["startDate"]] -= ele.amount;
    } else {
      solution[ele["startDate"]] = -ele.amount;
    }
  });
};

// creates a balance sheet object in sorted order
const createOutput = () => {
  const revenueDates = getMinMaxDates(revenueData);
  const expenseDates = getMinMaxDates(expenseData);

  let minStartDate =
    revenueDates.minStartDate < expenseDates.minStartDate
      ? new Date(revenueDates.minStartDate)
      : new Date(expenseDates.minStartDate);

  let maxEndDate =
    revenueDates.maxEndDate > expenseDates.maxEndDate
      ? new Date(revenueDates.maxEndDate)
      : new Date(expenseDates.maxEndDate);

  const numberOfMonths = getNumberOfMonths(minStartDate, maxEndDate);

  for (let i = 0; i <= numberOfMonths; i++) {
    monthlyexpenses.push({
      amount: solution[minStartDate.toISOString()] ?? 0,
      startDate: minStartDate.toISOString(),
    });
    minStartDate = getNextMonth(minStartDate);
  }
};

balanceSheetCalculation();
createOutput();

const output = { balance: monthlyexpenses };
console.log(output);

// creates a json file containing the balance sheet
fs.writeFile("balancesheet.json", JSON.stringify(output), (err, result) => {
  if (err) console.log("error", err);
});

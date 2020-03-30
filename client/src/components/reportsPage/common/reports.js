import React from 'react';
import AvgDays from '../reportResults/AvgDays';
import AvgIncomePerMonth from '../reportResults/AvgIncomePerMonth';
import CurrentRentals from '../reportResults/CurrentRentals';
import YearMonthPicker from '../reportResults/YearMonthPicker';
import TotalIncomePerMonth from '../reportResults/TotalIncomePerMonth';

const today = new Date();

export default [{
  reportId: 1,
  title: 'Average days per class',
  urlRequest: 'reports/class/averageDays',
  children: [<AvgDays />],
},
{
  reportId: 2,
  title: 'Current rented cars per class',
  urlRequest: 'reports/class/currentRentedCars',
  children: [<CurrentRentals />],
},
{
  reportId: 3,
  title: 'Average income per class per month',
  urlRequest: `reports/class/avgMonthlyIncome/?year=${today.getFullYear()}&month=${today.getMonth()}`,
  children: [<AvgIncomePerMonth />, <YearMonthPicker />],
},
{
  reportId: 4,
  title: 'Total income per class per month',
  urlRequest: `reports/class/totalMonthly/?year=${today.getFullYear()}&month=${today.getMonth()}`,
  children: [<TotalIncomePerMonth />, <YearMonthPicker />],
}];
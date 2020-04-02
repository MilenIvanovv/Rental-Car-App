import React from 'react';
import AvgDays from '../reportResults/AvgDays';
import AvgIncomePerMonth from '../reportResults/AvgIncomePerMonth';
import CurrentRentals from '../reportResults/CurrentRentals';
// eslint-disable-next-line import/no-cycle
import YearMonthPicker from '../reportResults/yearMonthPicker/YearMonthPicker';
import TotalIncomePerMonth from '../reportResults/TotalIncomePerMonth';

const today = new Date();

export default [{
  reportId: 1,
  title: 'Average days per class',
  urlRequest: 'reports/class/averageDays',
  // eslint-disable-next-line react/jsx-filename-extension
  children: [<AvgDays key={1} />],
},
{
  reportId: 2,
  title: 'Current rented cars per class',
  urlRequest: 'reports/class/currentRentedCars',
  children: [<CurrentRentals key={1} />],
},
{
  reportId: 3,
  title: 'Average income per class per month',
  urlRequest: `reports/class/avgMonthlyIncome/?year=${today.getFullYear()}&month=${today.getMonth() + 1}`,
  children: [<AvgIncomePerMonth key={1} />, <YearMonthPicker key={2} />],
},
{
  reportId: 4,
  title: 'Total income per class per month',
  urlRequest: `reports/class/totalMonthly/?year=${today.getFullYear()}&month=${today.getMonth() + 1}`,
  children: [<TotalIncomePerMonth key={1} />, <YearMonthPicker key={2} />],
}];

import React from 'react';
import AvgDays from '../reportResults/AvgDays';
import AvgIncomePerMonth from '../reportResults/AvgIncomePerMonth';
import CurrentRentals from '../reportResults/CurrentRentals';
import YearMonthPicker from '../reportResults/YearMonthPicker';

export default {
  averageDaysPerClass: {
    reportId: 1,
    title: 'Average days per class',
    urlRequest: 'reports/class/averageDays',
    children: [<AvgDays/>],
  },
  currentlyRentedCarsPerClass: {
    reportId: 2,
    title: 'Current rented cars per class',
    urlRequest: 'reports/class/currentRentedCars',
    children: [<CurrentRentals/>],
  },
  averageIncomePerClass: {
    reportId: 3,
    title: 'Average income per class per month',
    urlRequest: 'reports/class/avgMonthlyIncome',
    children: [<AvgIncomePerMonth/>, <YearMonthPicker/>],
  },
};
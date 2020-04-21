const today = new Date();

export default [
  {
    reportId: 7,
    title: 'Average car revenue grouped by car class (and month)',
    urlRequest: `reports/class/yearly/?year=${today.getFullYear()}&type=revenue`,
    yearPicker: true,
    graph: true,
  },
  {
    reportId: 6,
    title: 'Average car expenses grouped by car class (and month)',
    urlRequest: `reports/class/yearly/?year=${today.getFullYear()}&type=expenses`,
    graph: true,
    yearPicker: true,
  },
  {
    reportId: 5,
    title: 'Average car income grouped by car class (and month)',
    urlRequest: `reports/class/yearly/?year=${today.getFullYear()}&type=income`,
    graph: true,
    yearPicker: true,
  },
  {
    reportId: 4,
    title: 'Total income per class',
    urlRequest: `reports/class/totalMonthly/?year=${today.getFullYear()}&month=${today.getMonth() + 1}`,
    monthPicker: true,
  },
  {
    reportId: 3,
    title: 'Average income per class',
    urlRequest: `reports/class/avgMonthlyIncome/?year=${today.getFullYear()}&month=${today.getMonth() + 1}`,
    monthPicker: true,
  },
  {
    reportId: 2,
    title: 'Current rented cars per class',
    urlRequest: 'reports/class/currentRentedCars',
  },
  {
    reportId: 1,
    title: 'Average days per class',
    urlRequest: 'reports/class/averageDays',
  },
];

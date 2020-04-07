const today = new Date();

export default [{
  reportId: 1,
  title: 'Average days per class',
  urlRequest: 'reports/class/averageDays',
},
{
  reportId: 2,
  title: 'Current rented cars per class',
  urlRequest: 'reports/class/currentRentedCars',
},
{
  reportId: 3,
  title: 'Average income per class',
  urlRequest: `reports/class/avgMonthlyIncome/?year=${today.getFullYear()}&month=${today.getMonth() + 1}`,
  monthPicker: true,
},
{
  reportId: 4,
  title: 'Total income per class',
  urlRequest: `reports/class/totalMonthly/?year=${today.getFullYear()}&month=${today.getMonth() + 1}`,
  monthPicker: true,
}];

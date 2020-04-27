import moment from 'moment';
import { RentalStatus } from '../../common/rental-status.enum';

export const initialRentals = [{
  car: 1,
  firstName: 'Bill',
  lastName: 'Gates',
  age: 18,
  status: 'open',
  estimatedDate: moment().subtract(3, 'days').toISOString(),
  returnDate: null,
  dateFrom: moment().subtract(5, 'days').toISOString(),
  pricePerDay: 50,
},
{
  car: 2,
  firstName: 'Ivan',
  lastName: 'Ivanov',
  age: 30,
  status: 'open',
  estimatedDate: moment().subtract(1, 'days').toISOString(),
  returnDate: null,
  dateFrom: moment().subtract(5, 'days').toISOString(),
  pricePerDay: 50,
},
{
  car: 3,
  firstName: 'Petar',
  lastName: 'Gerogiev',
  age: 25,
  status: 'open',
  estimatedDate: moment().add(1, 'days').toISOString(),
  returnDate: null,
  dateFrom: moment().subtract(5, 'days').toISOString(),
  pricePerDay: 50,
},
{
  car: 4,
  firstName: 'Petko',
  lastName: 'Petkov',
  age: 26,
  status: 'open',
  estimatedDate: moment().add(5, 'days').toISOString(),
  returnDate: null,
  dateFrom: moment().subtract(5, 'days').toISOString(),
  pricePerDay: 50,
}];


const generateRental = (index, thisYear?: boolean) => {
  const today = new Date();
  const year = thisYear ? today.getFullYear() : today.getFullYear() - 1;
  const lastMonthIndex = thisYear ? today.getMonth() : 12; 
  const month = index % lastMonthIndex + 1;
  const date = `${year}${month < 10 ? '0' : ''}${month}28`;
  const prices = ['15','20','35','40', '50'];
  const random = Math.floor(Math.random() * 6);  

  return {
      car: index % 7 + 1,
      firstName: 'Petko',
      lastName: 'Petkovich',
      age: 18 + index % 10,
      status: RentalStatus.returned,
      estimatedDate: moment(date).subtract(10, 'days').toISOString(),
      returnDate: moment(date).toISOString(),
      dateFrom: moment(date).subtract(10 + random, 'days').toISOString(),
      pricePerDay: prices[index % 5],
    };
}

export const extraRentals = Array.from({ length: 230 }).map((el, index) => generateRental(index));

export const lastMonthsExtraRentals = Array.from({ length: 50 }).map((el, index) => generateRental(index, true));


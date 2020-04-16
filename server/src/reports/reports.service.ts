/* eslint-disable no-extend-native */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isNumber } from 'util';
import { Repository, Between } from 'typeorm';
import { RentedCar } from '../database/entities/rentals.entity';
import { Car } from '../database/entities/cars.entity';
import { RentalStatus } from '../common/rental-status.enum';
import { CarClass } from '../database/entities/class.entity';
import { CalculateRentService } from '../core/calculate-rent.service';
import { CarStatus } from '../common/car-status.enum';
import { ReportPerClass } from './models/reportPerClass';

interface MapEntry<T, K> {
  key: T;
  value: K;
}

declare global {
  interface Array<T> {

    aggregateBy(x:
      {
        groupByFn: (a: T) => any,
        calcFn: (a: T) => number,
        aggFn: (x: { count: number, sum: number }) => number
      }): Array<MapEntry<any, number>>

    averageBy(x: { groupByFn: (a: T) => any, calcFn: (a: T) => number }): Array<MapEntry<any, number>>

    totalBy(x: { groupByFn: (a: T) => any, calcFn: (a: T) => number }): Array<MapEntry<any, number>>

    percentBy(x: { groupByFn: (a: T) => any, percentFn: (a: T) => boolean }): Array<MapEntry<any, number>>

    groupBy(groupByFn: (a: T) => any): Array<MapEntry<any, Array<T>>>

  }
}

Array.prototype.groupBy = function (groupByFn: (a: any) => any) {

  const groupByResult: Array<MapEntry<any, any>> = [];

  this.forEach(element => {
    const key = groupByFn(element);
    const mapEntry = groupByResult.find(r => r.key === key);
    if (!mapEntry) {
      groupByResult.push({ key, value: [element] })
    } else {
      mapEntry.value.push(element);
    }
  });

  return groupByResult;
}


Array.prototype.aggregateBy = function (x: {
  groupByFn: (a: any) => any,
  calcFn: (a: any) => number,
  aggFn: (x: { count: number, sum: number }) => number
}
) {

  const groupByResult = this.groupBy(x.groupByFn);

  return groupByResult.map(({ key, value }) => {
    const sum = value.reduce((sum, current) => {
      return sum + x.calcFn(current);
    }, 0)

    return { key, value: x.aggFn({ count: value.length, sum }) }
  });
}

Array.prototype.averageBy = function (x: {
  groupByFn: (a: any) => any,
  calcFn: (a: any) => number
}
) {

  return this.aggregateBy({ groupByFn: x.groupByFn, calcFn: x.calcFn, aggFn: ({ count, sum }) => sum / count })
}

Array.prototype.totalBy = function (x: {
  groupByFn: (a: any) => any,
  calcFn: (a: any) => number
}
) {

  return this.aggregateBy({ groupByFn: x.groupByFn, calcFn: x.calcFn, aggFn: ({ count, sum }) => +sum.toFixed(2) })
}

Array.prototype.percentBy = function (x: {
  groupByFn: (a: any) => any,
  percentFn: (a: any) => boolean
}
) {
  const groupByResult = this.groupBy(x.groupByFn);

  return groupByResult.map(({ key, value }) => {
    const countTrue = value.filter(v => x.percentFn(v)).length
    return {
      key,
      value: countTrue / value.length * 100
    }
  });
}

@Injectable()
export class ReportsService {

  constructor(
    @InjectRepository(RentedCar) private readonly rentalsRepository: Repository<RentedCar>,
    @InjectRepository(CarClass) private readonly classRepository: Repository<CarClass>,
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    private readonly calculate: CalculateRentService,
  ) { }

  groupByClass(classes: CarClass[], ...aggData: Array<Array<MapEntry<any, number>>>): { class: string, result: string[] }[] {
    return classes.map((c) => {
      const result = aggData.map((d) => {
        const agg = d.find(a => a.key === c.name);
        return (agg && agg.value.toString()) || "0";
      })

      return { class: c.name, result }
    })
  }

  async getAverageDaysPerClass(): Promise<ReportPerClass> {
    const classes = await this.classRepository.find();
    const rentals = await this.rentalsRepository.find({ where: { status: RentalStatus.returned }, relations: ['car', 'car.class'] });

    const rows = [{
      name: 'days',
      dataType: '',
    }];

    const aggregated = rentals.averageBy({
      groupByFn: (r) => r.car.class.name,
      calcFn: (r) => this.calculate.days(r.dateFrom, r.returnDate)
    });

    const columns = this.groupByClass(classes, aggregated);

    return { rows, columns }
  }

  async getCurrentlyRentedCars(): Promise<ReportPerClass> {
    const classes = await this.classRepository.find();
    const cars = await this.carRepository.find({ where: { status: CarStatus.borrowed }, relations: ['class'] });

    const rows = [{
      name: 'rented cars',
      dataType: '%',
    }];

    const aggregated = cars.percentBy({
      groupByFn: (c) => c.class.name,
      percentFn: (c) => c.status === CarStatus.borrowed
    });

    const columns = this.groupByClass(classes, aggregated);

    return { rows, columns };
  }

  async getAverageMonthlyIncome(year: number, month: number): Promise<ReportPerClass> {
    const classes = await this.classRepository.find();
    const rentals = await this.rentalsRepository.find({ where: { status: RentalStatus.returned, returnDate: this.isInMonth(year, month) }, relations: ['car', 'car.class'] });

    const rows = [{
      name: 'income',
      dataType: '$',
    }];

    const columns = this.groupByClass(classes, rentals.averageBy({
      groupByFn: r => r.car.class.name,
      calcFn: r => this.getRentalIncome(r)
    }));

    return { rows, columns };
  }

  async getTotalMonthly(year: number, month: number): Promise<ReportPerClass> {
    const classes = await this.classRepository.find();
    const rentals = await this.rentalsRepository.find({ where: { status: RentalStatus.returned, returnDate: this.isInMonth(year, month) }, relations: ['car', 'car.class'] });

    // const rows = [{
    //   name: 'income',
    //   dataType: '$',
    // },
    // {
    //   name: 'expenses',
    //   dataType: '$',
    // },
    // {
    //   name: 'total',
    //   dataType: '$',
    // }];

    // const columns = classes.reduce((acc, carClass) => {
    //   const rentalsByClass = rentals.filter((rental) => rental.car.class.name === carClass.name);
    //   const income = rentalsByClass.reduce(this.calculateAverageIncome.bind(this), { sum: 0 }).sum;
    //   const expenses = rentalsByClass.reduce(this.calculateAverageExpenses, { sum: 0 }).sum;

    //   acc.push({ class: carClass.name, result: [ income, expenses, +(income - expenses).toFixed(2)] });

    //   return acc;
    // }, []);

    // const agregatedIncome = rentals.totalBy({
    //   groupByFn: r => r.car.class.name,
    //   calcFn: r => this.getRentalIncome(r),
    // });

    // const agregatedExpenses = rentals.totalBy({
    //   groupByFn: r => r.car.class.name,
    //   calcFn: r => this.getRentalExpenses(r)
    // });

    // const agregatedTotal = rentals.totalBy({
    //   groupByFn: r => r.car.class.name,
    //   calcFn: r => this.getRentalIncome(r) - this.getRentalExpenses(r)
    // });


    let rows = [{
      name: 'income',
      dataType: '$',
      calcFn: r => +this.getRentalIncome(r)
    },
    {
      name: 'expenses',
      dataType: '$',
      calcFn: r => this.getRentalExpenses(r),
    },
    {
      name: 'total',
      dataType: '$',
      calcFn: r => this.getRentalIncome(r) - this.getRentalExpenses(r),
    }];

    const agregated = rows.map((x) => rentals.totalBy({
      groupByFn: r => r.car.class.name,
      calcFn: x.calcFn,
    }))

    const columns = this.groupByClass(classes, ...agregated);
    rows = rows.map((x) => (delete x.calcFn, x))

    return { rows, columns };
  }

  private isInMonth(year: number, month: number) {
    if (!isNumber(year) || isNaN(year) || year < 1970 ||
      !isNumber(month) || isNaN(month) || month < 1 || month > 12) {
      throw new BadRequestException('Invalid month');
    }

    const firstDay = new Date(year, month - 1, 2);
    const lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0);

    return Between(firstDay, lastDay);
  }

  private calculateAverageDays(acc: any, rental: RentedCar): number {
    acc.days || (acc.days = 0);
    acc.count || (acc.count = 0);

    acc.days = this.calculate.days(new Date(rental.dateFrom), new Date(rental.returnDate));
    acc.count++;

    acc.result = Math.floor(acc.days / acc.count) || 0;

    return acc;
  }

  private calculateCurrentRentedCars(acc: any, car: Car): { result: number } {
    acc.rented || (acc.rented = 0);
    acc.sum || (acc.sum = 0);

    if (car.status === CarStatus.borrowed) {
      acc.rented++;
    }

    acc.sum++;
    acc.result = Math.floor(acc.rented / acc.sum * 100) || 0;

    return acc;
  }

  private calculateAverageIncome(acc: any, rental: RentedCar): { sum: number, count: number, result: number } {
    acc.sum || (acc.sum = 0);
    acc.count || (acc.count = 0);


    acc.sum += this.getRentalIncome(rental);
    acc.count++;

    acc.result = +(acc.sum / acc.count).toFixed(2) || 0;

    return acc;
  }

  private getRentalIncome(rental: {
    dateFrom: Date,
    returnDate: Date,
    pricePerDay: number,
    estimatedDate: Date,
    age: number,
  }) {
    const {
      dateFrom,
      returnDate,
      pricePerDay,
      estimatedDate,
      age,
    } = rental;

    const days = this.calculate.days(new Date(dateFrom), new Date(returnDate));
    const newPricePerDay = this.calculate.applyAllToPrice(pricePerDay, days, age);

    // Add penalty
    const penaltyDays = this.calculate.days(new Date(estimatedDate), new Date(returnDate));

    let penalty = 0;
    if (penaltyDays > 0) {
      const penaltyResult = this.calculate.penalty(pricePerDay, penaltyDays);

      // if penalty days is 7 and price per day is 100 => total penalty = 7 * pricePerDayPenalty(100); 
      penalty = penaltyResult.totalPenalty;
    }

    return this.calculate.totalPrice(newPricePerDay, days) + penalty;
  }

  private getRentalExpenses(rental: { car: any }) {
    return (rental.car.monthlyExpences + rental.car.insuranceFeePerYear / 12) || 0;
  }

  private calculateAverageExpenses(acc: any, rental: RentedCar): { sum: number, count: number, result: number } {
    acc.sum || (acc.sum = 0);
    acc.count || (acc.count = 0);

    const { car } = rental;

    acc.sum += (car.monthlyExpences + car.insuranceFeePerYear / 12) || 0;
    acc.sum = +acc.sum.toFixed(2);

    acc.count++;

    acc.result = +(acc.sum / acc.count).toFixed(2) || 0;

    return acc;
  }
}



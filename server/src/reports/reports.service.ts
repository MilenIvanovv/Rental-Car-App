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

@Injectable()
export class ReportsService {

  constructor(
    @InjectRepository(RentedCar) private readonly rentalsRepository: Repository<RentedCar>,
    @InjectRepository(CarClass) private readonly classRepository: Repository<CarClass>,
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    private readonly calculate: CalculateRentService,
  ) { }

  async getAverageDaysPerClass(): Promise<ReportPerClass> {
    const classes = await this.classRepository.find();
    const rentals = await this.rentalsRepository.find({ where: { status: RentalStatus.returned }, relations: ['car', 'car.class'] });

    const rows = [{
      name: 'days',
      dataType: '',
    }];

    const columns = classes.reduce((acc, carClass) => {
      const { result } = rentals
        .filter((rental) => rental.car.class.name === carClass.name)
        .reduce(this.calculateAverageDays.bind(this), { result: 0 });

      acc.push({ class: carClass.name, result: [result] });

      return acc;
    }, []);

    return { rows, columns }
  }

  async getCurrentlyRentedCars(): Promise<ReportPerClass> {
    const classes = await this.classRepository.find();
    const cars = await this.carRepository.find({ where: { status: CarStatus.borrowed }, relations: ['class'] });

    const rows = [{
      name: 'rented cars',
      dataType: '%',
    }];

    const columns = classes.reduce((acc, carClass) => {
      const { result } = cars
        .filter((car) => car.class.name === carClass.name)
        .reduce(this.calculateCurrentRentedCars, { result: 0 });

      acc.push({ class: carClass.name, result: [result] });

      return acc;
    }, []);

    return { rows, columns };
  }

  async getAverageMonthlyIncome(year: number, month: number): Promise<ReportPerClass> {
    const classes = await this.classRepository.find();
    const rentals = await this.rentalsRepository.find({ where: { status: RentalStatus.returned, returnDate: this.isInMonth(year, month) }, relations: ['car', 'car.class'] });

    const rows = [{
      name: 'income',
      dataType: '$',
    }];

    const columns = classes.reduce((acc, carClass) => {
      const { result } = rentals
        .filter((rental) => rental.car.class.name === carClass.name)
        .reduce(this.calculateAverageIncome.bind(this), { result: 0 });

      acc.push({ class: carClass.name, result: [result] });

      return acc;
    }, []);

    return { rows, columns };
  }

  async getTotalMonthly(year: number, month: number): Promise<ReportPerClass> {
    const classes = await this.classRepository.find();
    const rentals = await this.rentalsRepository.find({ where: { status: RentalStatus.returned, returnDate: this.isInMonth(year, month) }, relations: ['car', 'car.class'] });

    const rows = [{
      name: 'income',
      dataType: '$',
    },
    {
      name: 'expenses',
      dataType: '$',
    },
    {
      name: 'total',
      dataType: '$',
    }];

    const columns = classes.reduce((acc, carClass) => {
      const rentalsByClass = rentals.filter((rental) => rental.car.class.name === carClass.name);
      const income = rentalsByClass.reduce(this.calculateAverageIncome.bind(this), { sum: 0 }).sum;
      const expenses = rentalsByClass.reduce(this.calculateAverageExpenses, { sum: 0 }).sum;

      acc.push({ class: carClass.name, result: [ income, expenses, +(income - expenses).toFixed(2)] });

      return acc;
    }, []);

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

    acc.sum += this.calculate.totalPrice(newPricePerDay, days) + penalty;
    acc.count++;

    acc.result = +(acc.sum / acc.count).toFixed(2) || 0;

    return acc;
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



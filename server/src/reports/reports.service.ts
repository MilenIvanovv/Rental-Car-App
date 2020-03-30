import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RentedCar } from 'src/database/entities/rentals.entity';
import { Repository, Between } from 'typeorm';
import { Car } from 'src/database/entities/cars.entity';
import { RentalStatus } from 'src/common/rental-status.enum';
import { CarClass } from 'src/database/entities/class.entity';
import { CalculateRentService } from 'src/core/calculate-rent.service';
import { CarStatus } from 'src/common/car-status.enum';
import { ReportPerClass } from './models/reportPerClass';
import { isNumber } from 'util';

@Injectable()
export class ReportsService {

  constructor(
    @InjectRepository(RentedCar) private readonly rentalsRepository: Repository<RentedCar>,
    @InjectRepository(CarClass) private readonly classRepository: Repository<CarClass>,
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    private readonly calculate: CalculateRentService,
  ) { }

  async getAverageDaysPerClass(): Promise<ReportPerClass<number>[]> {
    const classes = await this.classRepository.find();
    const rentals = await this.rentalsRepository.find({ where: { status: RentalStatus.returned }, relations: ['car', 'car.class'] });

    return classes.reduce((acc, carClass) => {
      const result = rentals
        .filter((rental) => rental.car.class.name === carClass.name)
        .reduce(this.calculateAverageDays.bind(this), { result: 0 })
        .result;

      acc.push({ class: carClass.name, result });

      return acc;
    }, []);
  }

  async getCurrentlyRentedCars(): Promise<ReportPerClass<number>[]> {
    const classes = await this.classRepository.find();
    const cars = await this.carRepository.find({ where: { status: CarStatus.borrowed }, relations: ['class'] });

    return classes.reduce((acc, carClass) => {
      const result = cars
        .filter((car) => car.class.name === carClass.name)
        .reduce(this.calculateCurrentRentedCars, { result: 0 })
        .result;

      acc.push({ class: carClass.name, result });

      return acc;
    }, []);
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

  async getAverageMonthlyIncome(year: number, month: number): Promise<any[]> {
    const classes = await this.classRepository.find();
    const rentals = await this.rentalsRepository.find({ where: { status: RentalStatus.returned, returnDate: this.isInMonth(year, month) }, relations: ['car', 'car.class'] });
    
    return classes.reduce((acc, carClass) => {
      const result = rentals
        .filter((rental) => rental.car.class.name === carClass.name)
        .reduce(this.calculateAverageIncome.bind(this), { result: 0 })
        .result;

      acc.push({ class: carClass.name, result });

      return acc;
    }, []);
  }

  async getTotalMonthly(year: number, month: number): Promise<ReportPerClass<{ income: number, expenses: number, revenue: number }>[]> {
    const classes = await this.classRepository.find();
    const rentals = await this.rentalsRepository.find({ where: { status: RentalStatus.returned, returnDate: this.isInMonth(year, month) }, relations: ['car', 'car.class'] });

    return classes.reduce((acc, carClass) => {
      const rentalsByClass = rentals.filter((rental) => rental.car.class.name === carClass.name);
      const income = rentalsByClass.reduce(this.calculateAverageIncome.bind(this), { sum: 0 }).sum;
      const expenses = rentalsByClass.reduce(this.calculateAverageExpenses, { sum: 0 }).sum;

      acc.push({ class: carClass.name, result: { income, expenses, revenue: +(income - expenses).toFixed(2)} });

      return acc;
    }, []);
  }

  private calculateAverageDays(acc: any, rental: RentedCar): number {
    acc.days || (acc.days = 0);
    acc.count || (acc.count = 0);

    acc.days = this.calculate.days(new Date(rental.dateFrom), new Date(rental.returnDate));
    acc.count++;

    acc.result = Math.floor(acc.days / acc.count) || 0;

    return acc;
  }

  private calculateCurrentRentedCars(acc: any, car: Car): number {
    acc.rented || (acc.rented = 0);
    acc.total || (acc.total = 0);

    if (car.status === CarStatus.borrowed) {
      acc.rented++;
    }

    acc.total++;
    acc.result = Math.floor((100 * acc.total) / acc.rented) || 0;

    return acc;
  }

  private calculateAverageIncome(acc: any, rental: RentedCar): { sum: number, count: number, result: number} {
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



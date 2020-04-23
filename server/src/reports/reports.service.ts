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
import { ReportType } from '../common/report-type.enum';
import { Aggregation } from '../common/array-extentions';

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

    const aggregated = rentals.averageBy({
      groupByFn: (r) => r.car.class.name,
      calcFn: (r) => this.calculate.days(r.dateFrom, r.returnDate)
    });

    const columns = this.groupByClass(classes, aggregated);
    const rows = [{ name: 'days', dataType: '' }];

    return { rows, columns }
  }

  async getCurrentlyRentedCars(): Promise<ReportPerClass> {
    const classes = await this.classRepository.find();
    const cars = await this.carRepository.find({ where: { status: CarStatus.borrowed }, relations: ['class'] });

    const aggregated = cars.percentBy({
      groupByFn: (c) => c.class.name,
      percentFn: (c) => c.status === CarStatus.borrowed
    });

    const columns = this.groupByClass(classes, aggregated);
    const rows = [{ name: 'rented cars', dataType: '%' }];

    return { rows, columns };
  }

  private reportTypes = {
    [ReportType.income]: {
      calcFn: (r) => this.calculateRentalIncome(r),
      row: { name: 'income', dataType: '$' },
    },
    [ReportType.expenses]: {
      calcFn: (r) => this.calculateRentalExpenses(r),
      row: { name: 'expenses', dataType: '$' },
    },
    [ReportType.revenue]: {
      calcFn: (r) => this.calculateRentalIncome(r) - this.calculateRentalExpenses(r),
      row: { name: 'revenue', dataType: '$' },
    },
    [ReportType.insuaranceExpense]: {
      calcFn: (r) => this.calculateRentalInsuranceExpense(r),
      row: { name: 'insuarance expense', dataType: '$' },
    }
  }

  async getMonthly(year: number, month: number, type: ReportType[] = [ReportType.income], aggergation: Aggregation = Aggregation.average): Promise<ReportPerClass> {
    const classes = await this.classRepository.find();
    const rentals = await this.rentalsRepository.find({ where: { status: RentalStatus.returned, returnDate: this.isInMonth(year, month) }, relations: ['car', 'car.class'] });

    return this.calculateMonthly(classes, rentals, type, aggergation)
  }

  async getYearly(year: number, type: ReportType[] = [ReportType.income], aggergation: Aggregation = Aggregation.average): Promise<ReportPerClass[]> {
    const classes = await this.classRepository.find();
    const rentals = await this.rentalsRepository.find({ where: { status: RentalStatus.returned, returnDate: this.isInYear(year) }, relations: ['car', 'car.class'] });

    const groupedRentals = rentals
      .groupBy((r) => new Date(r.returnDate).toLocaleString('default', { month: 'long' }));

    return this.groupByYear(groupedRentals)
      .map(({ key, value }) => this.calculateMonthly(classes, value, type, aggergation));
  }

  private calculateMonthly(classes: CarClass[], rentals: RentedCar[], reportType: ReportType[], aggergation: Aggregation) {
    const agregated = reportType
      .map((x) => rentals[aggergation]({
        groupByFn: r => r.car.class.name,
        calcFn: r => this.reportTypes[x].calcFn(r),
      }))

    const columns = this.groupByClass(classes, ...agregated);
    const rows = reportType.map((x) => this.reportTypes[x].row);

    return { rows, columns };
  }

  private calculateRentalIncome(rental: {
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

  private calculateRentalExpenses(rental: { car: any }) {
    return (rental.car.monthlyExpences + this.calculateRentalInsuranceExpense(rental)) || 0;
  }

  private calculateRentalInsuranceExpense(rental: { car: any }) {
    return (rental.car.insuranceFeePerYear / 12) || 0;
  }

  private groupByClass(classes: CarClass[], ...aggData: Array<Array<MapEntry<any, number>>>): { class: string, result: string[] }[] {
    return classes.map((c) => {
      const result = aggData.map((d) => {
        const agg = d.find(a => a.key === c.name);
        return (agg && agg.value.toString()) || "0";
      })

      return { class: c.name, result }
    })
  }

  private groupByYear(collection: any): { key: string, value: any[] }[] { // Fills months with no data
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    return monthNames.map((m) => {
      const agg = collection.find(a => a.key === m);

      return { key: m, value: (agg && agg.value) || [] }
    })
  }

  private isInMonth(year: number, month: number) {
    const { firstDay, lastDay } = this.getMonthInterval(year, month);

    return Between(firstDay, lastDay);
  }

  private getMonthInterval(year: number, month: number) {
    if (!isNumber(year) || isNaN(year) || year < 1970 ||
      !isNumber(month) || isNaN(month) || month < 1 || month > 12) {
      throw new BadRequestException('Invalid month');
    }

    const firstDay = new Date(year, month - 1, 2);
    const lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0);

    return { firstDay, lastDay }
  }

  private isInYear(year: number) {
    if (!isNumber(year) || isNaN(year) || year < 1970) {
      throw new BadRequestException('Invalid year');
    }

    const yearStart = new Date(year, 0, 1);
    const yearEnd = new Date(year, 11, 31);

    return Between(yearStart, yearEnd);
  }
}



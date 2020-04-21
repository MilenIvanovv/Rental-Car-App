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

  groupByYear(collection: any): { key: string, value: any[] }[] {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    return monthNames.map((m) => {
      const agg = collection.find(a => a.key === m);

      return { key: m, value: (agg && agg.value) || [] }
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

    return this.calculateAverageMonthly(classes, rentals, ReportType.income);
  }

  calculateAverageMonthly(classes: CarClass[], rentals: RentedCar[], reportType: ReportType) {
    const rows = [{
      name: 'income',
      dataType: '$',
    }];

    const groupedRentals = rentals.averageBy({
      groupByFn: r => r.car.class.name,
      calcFn: r => this.reportTypes[reportType](r),
    });

    const columns = this.groupByClass(classes, groupedRentals);

    return { rows, columns };
  }

  async getTotalMonthly(year: number, month: number): Promise<ReportPerClass> {
    const classes = await this.classRepository.find();
    const rentals = await this.rentalsRepository.find({ where: { status: RentalStatus.returned, returnDate: this.isInMonth(year, month) }, relations: ['car', 'car.class'] });

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

  async getYearly(year: number, type: ReportType = ReportType.income): Promise<ReportPerClass[]> {
    const classes = await this.classRepository.find();
    const rentals = await this.rentalsRepository.find({ where: { status: RentalStatus.returned, returnDate: this.isInYear(year) }, relations: ['car', 'car.class'] });

    const groupedRentals = rentals
      .groupBy((r) => new Date(r.returnDate).toLocaleString('default', { month: 'long' }));

    return this.groupByYear(groupedRentals)
      .map(({ key, value }) => this.calculateAverageMonthly(classes, value, type));
  }

  reportTypes = {
      [ReportType.income]: (r) => this.getRentalIncome(r),
      [ReportType.expenses]: (r) => this.getRentalExpenses(r),
      [ReportType.revenue]: (r) => this.getRentalIncome(r) - this.getRentalExpenses(r),
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

}



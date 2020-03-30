import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RentedCar } from 'src/database/entities/rentals.entity';
import { Repository } from 'typeorm';
import { Car } from 'src/database/entities/cars.entity';
import { RentalStatus } from 'src/common/rental-status.enum';
import { CarClass } from 'src/database/entities/class.entity';
import { CalculateRentService } from 'src/core/calculate-rent.service';
import { CarStatus } from 'src/common/car-status.enum';
import { ReportPerClass } from './models/reportPerClass';

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
}

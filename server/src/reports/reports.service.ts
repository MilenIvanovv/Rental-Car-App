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

    return classes.reduce((acc, carClass) =>
      (acc.push(this.getAverageDaysByClass(carClass, rentals)), acc), []);
  }

  async getCurrentlyRentedCars(): Promise<ReportPerClass<number>[]> {
    const classes = await this.classRepository.find();
    const cars = await this.carRepository.find({ where: { status: CarStatus.borrowed }, relations: ['class'] });

    return classes.reduce((acc, carClass) => {
      const result = cars.reduce((innerAcc, car) => {
        if (car.class.name !== carClass.name) {
          return innerAcc;
        }

        if (car.status === CarStatus.borrowed) {
          innerAcc.rented ++;
        }
        innerAcc.total++;

        return innerAcc;
      }, { rented: 0, total: 0 });

      const report = { 
        class: carClass.name, 
        result: Math.floor((100 * result.total) / result.rented) || 0,
      }

      acc.push(report);

      return acc;
    }, [])
  }

  private getAverageDaysByClass(carClass: CarClass, rentals: RentedCar[]): ReportPerClass<number> {
    const result = rentals.reduce((acc, rental) => {
      
      if (rental.car.class.name !== carClass.name) {
        return acc;
      }

      acc.days = this.calculate.days(new Date(rental.dateFrom), new Date(rental.returnDate));
      acc.count++;

      return acc;
    }, { days: 0, count: 0 })

    return { class: carClass.name, result: Math.floor(result.days / result.count) };
  }
}

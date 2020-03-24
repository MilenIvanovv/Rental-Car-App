import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RentedCar } from 'src/database/entities/rentals.entity';
import { Repository } from 'typeorm';
import { Car } from 'src/database/entities/cars.entity';
import { RentalStatus } from 'src/common/rental-status.enum';
import { CarClass } from 'src/database/entities/class.entity';
import { CalculateRentService } from 'src/rentals/calculate-rent.service';
import { AverageDaysByClass } from './models/averageDaysByClass';

@Injectable()
export class ReportsService {

  constructor(
    @InjectRepository(RentedCar) private readonly rentalsRepository: Repository<RentedCar>,
    @InjectRepository(CarClass) private readonly classRepository: Repository<CarClass>,
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    private readonly calculate: CalculateRentService,
  ) { }

  async getAverageDaysPerClass(): Promise<AverageDaysByClass[]> {
    const classes = await this.classRepository.find();
    const rentals = await this.rentalsRepository.find({ where: { status: RentalStatus.returned }, relations: ['car', 'car.class'] });

    return classes.reduce((acc, carClass) =>
      (acc.push(this.getAverageDaysByClass(carClass, rentals)), acc), [])
  }

  private getAverageDaysByClass(carClass: CarClass, rentals: RentedCar[]): AverageDaysByClass {
    const result = rentals.reduce((acc, rental) => {
      
      console.log("ReportsService -> getAverageDaysByClass -> carClass.name", carClass.name)
      console.log("ReportsService -> getAverageDaysByClass -> rental.car.class.name", rental.car.class.name)
      if (rental.car.class.name !== carClass.name) {
        return acc;
      }

      acc.days = this.calculate.days(new Date(rental.dateFrom), new Date(rental.returnDate));
      acc.count++;
    }, { days: 0, count: 0 })

    return { class: carClass.name, averageDays: Math.floor(result.days / result.count) };
  }
}

import { Injectable } from '@nestjs/common';
import { RentedCar } from '../database/entities/rentals.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from '../database/entities/cars.entity';

@Injectable()
export class RentalsService {

  constructor(
    @InjectRepository(RentedCar) private readonly rentalsRepository: Repository<RentedCar>,
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
  ) { }

  getRenals() {
    return this.rentalsRepository.find({ relations:['car'] });
  }

  rentCar(carId, returnDate, { firstName, lastName, age}) {

  }
}

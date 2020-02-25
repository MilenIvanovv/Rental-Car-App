import { Injectable, NotFoundException } from '@nestjs/common';
import { RentedCar } from '../database/entities/rentals.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from '../database/entities/cars.entity';
import { ClientDTO } from './models/client.dto';
import { RentalStatus } from '../common/rental-status.enum';

@Injectable()
export class RentalsService {

  constructor(
    @InjectRepository(RentedCar) private readonly rentalsRepository: Repository<RentedCar>,
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
  ) { }

  async getRenals() {
    return await this.rentalsRepository.find({ relations:['car', 'car.class'] });
  }

  async rentCar(carId: number, returnDate: string, client: ClientDTO) {
    const carToRent = await this.carRepository.findOne(carId);

    if (!carToRent) {
      throw new NotFoundException(`Car with ${carId} was not found`);
    }

    return await this.rentalsRepository.save({ car: carToRent, returnDate, status: RentalStatus.open, ...client})
  }
}

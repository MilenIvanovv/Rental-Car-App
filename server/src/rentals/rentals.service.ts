import { Injectable, NotFoundException } from '@nestjs/common';
import { RentedCar } from '../database/entities/rentals.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from '../database/entities/cars.entity';
import { ClientDTO } from './models/client.dto';
import { RentalStatus } from '../common/rental-status.enum';
import { CarStatus } from '../common/car-status.enum';

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

  async returnCar(rentalId: string) {
    const rental = await this.rentalsRepository.findOne({ where: { id: rentalId }, relations: ['car']});

    if (!rental) {
      throw new NotFoundException(`Contract with id ${rentalId} not found`);
    }

    rental.status = RentalStatus.returned;
    rental.returnDate = new Date().toString();
    rental.car.status = CarStatus.listed;

    return await this.rentalsRepository.save(rental);
  }
}

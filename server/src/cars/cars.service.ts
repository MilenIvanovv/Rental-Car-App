import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from '../database/entities/cars.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CarDTO } from './models/car-dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) private readonly carsRepository: Repository<Car>,
  ) { }

  async getCars(): Promise<CarDTO[]> {
    return await this.carsRepository.find({ relations: ['class']});;
  }

  async getCar(carId: number): Promise<CarDTO> {
    const car = await this.carsRepository.findOne({ where: { id: carId }, relations: ['class']});

    if (!car) {
      throw new NotFoundException(`Car with id ${carId} not found`);
    }

    const classProto = Object.getPrototypeOf(new CarDTO());
    Object.setPrototypeOf(car, classProto);

    return car;
  }
}

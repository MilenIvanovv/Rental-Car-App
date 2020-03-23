import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from '../database/entities/cars.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CarDTO } from './models/cars-dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) private readonly carsRepository: Repository<Car>,
  ) { }

  async getCars(): Promise<CarDTO[]> {
    const cars = await this.carsRepository.find({ relations: ['class']});

    return plainToClass(CarDTO, cars);
  }

  async getCar(carId: number): Promise<CarDTO> {
    const car = await this.carsRepository.findOne({ where: { id: carId }, relations: ['class']});

    if (!car) {
      throw new NotFoundException(`Car with id ${carId} not found`);
    }

    return plainToClass(CarDTO, car);
  }
}

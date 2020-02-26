import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from '../database/entities/cars.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) private readonly carsRepository: Repository<Car>,
  ) { }

  async getCars(): Promise<Car[]> {
    return await this.carsRepository.find({ relations: ['class']});;
  }

  async getCar(carId: number): Promise<Car> {
    const car = await this.carsRepository.findOne({ where: { id: carId }, relations: ['class']});

    if (!car) {
      throw new NotFoundException(`Car with id ${carId} not found`);
    }

    return car;
  }
}

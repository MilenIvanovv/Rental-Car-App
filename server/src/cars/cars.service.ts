import { Injectable } from '@nestjs/common';
import { Car } from '../database/entities/cars.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) private readonly carsRepository: Repository<Car>,
  ) { }

  async getCars(): Promise<Car[]> {
    return this.carsRepository.find({ relations: ['class']});;
  }
}

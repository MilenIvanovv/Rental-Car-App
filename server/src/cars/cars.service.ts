import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CarDTO } from './models/cars-dto';
import { Car } from '../database/entities/cars.entity';
import { FsService } from '../core/fs/fs.service';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) private readonly carsRepository: Repository<Car>,
    private readonly fsService: FsService,
  ) { }

  async getCars(): Promise<CarDTO[]> {
    const cars = await this.carsRepository.find({ relations: ['class'] });

    return plainToClass(CarDTO, cars);
  }

  async getCar(carId: number): Promise<CarDTO> {
    const car = await this.carsRepository.findOne({ where: { id: carId }, relations: ['class'] });

    if (!car) {
      throw new NotFoundException(`Car with id ${carId} not found`);
    }

    return plainToClass(CarDTO, car);
  }

  async getCarImage(carId: number): Promise<string> {
    const car = await this.carsRepository.findOne({ where: { id: carId } });
    return (await this.fsService.readFile(`./src/database/seed/car-images/${car.model}.jpg`)).toString('base64');
  }
}

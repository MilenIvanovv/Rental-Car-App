import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CarDTO } from './models/cars-dto';
import { Car } from '../database/entities/cars.entity';
import { FsService } from '../core/fs/fs.service';
import { JimpService } from '../core/jimp.service';
import { lowRes } from '../common/car-image-formats';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) private readonly carsRepository: Repository<Car>,
    private readonly jimpService: JimpService,
    private readonly fsService: FsService,
  ) { }

  async getCars(): Promise<CarDTO[]> {
    const cars = await this.carsRepository.find({ relations: ['class'] });

    const carsWithImage = await Promise.all(cars.map(async (car) => {
      car.picture = await this.jimpService.findImage(`${car.brand} ${car.model}`, lowRes.width, lowRes.height);

      return car;
    }));

    return plainToClass(CarDTO, carsWithImage);
  }

  async getCar(carId: number): Promise<CarDTO> {
    const car = await this.carsRepository.findOne({ where: { id: carId }, relations: ['class'] });

    if (!car) {
      throw new NotFoundException(`Car with id ${carId} not found`);
    }

    car.picture = await this.jimpService.findImage(`${car.brand} ${car.model}`, lowRes.width, lowRes.height);

    return plainToClass(CarDTO, car);
  }

  async getCarImage(carId: number, width: number, height: number): Promise<Buffer> {
    const car = await this.carsRepository.findOne({ where: { id: carId } });

    if (!car) {
      throw new NotFoundException(`Car with id ${carId} not found`);
    }

    return await this.jimpService.findImage(`${car.brand} ${car.model}`, width, height);
  }
}

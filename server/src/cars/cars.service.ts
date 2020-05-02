import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CarDTO } from './models/cars-dto';
import { Car } from '../database/entities/cars.entity';
import { FsService } from '../core/fs/fs.service';
import { JimpService } from '../core/jimp.service';
import { lowRes } from '../common/car-image-formats';
import { Response } from 'express';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) private readonly carsRepository: Repository<Car>,
    private readonly jimpService: JimpService,
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

  async getCarImage(carId: number, width: number, height: number): Promise<string> {
    const heights = ['1280', '1920'];
    const widths = ['800', '1080'];

    if (!(!heights.includes(height.toString()) || !widths.includes(width.toString()))) {
      throw new BadRequestException('Bad image resolution');
    }

    const car = await this.carsRepository.findOne({ where: { id: carId } });

    if (!car) {
      throw new NotFoundException(`Car with id ${carId} not found`);
    }

    return await this.jimpService.findImage(`${car.picture}`, width, height);
  }
}

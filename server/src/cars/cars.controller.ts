import { Controller, Get, Param } from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from '../database/entities/cars.entity';
import { CarDTO } from './models/car-dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  async getCars(): Promise<CarDTO[]>  {
    return await this.carsService.getCars();
  }

  @Get('/:carId')
  async getCar(@Param('carId') carId: number): Promise<CarDTO>  {
    return await this.carsService.getCar(carId);
  }
}

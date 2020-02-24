import { Controller, Get } from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from '../database/entities/cars.entity';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  async getCars(): Promise<Car[]>  {
    return await this.carsService.getCars();
  }
}

import { Controller, Get, Param, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from '../database/entities/cars.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  
  @Get()
  async getCars(): Promise<Car[]>  {
    return await this.carsService.getCars();
  }
  
  @Get('/:carId')
  async getCar(@Param('carId') carId: number): Promise<Car>  {
    return await this.carsService.getCar(carId);
  }
}

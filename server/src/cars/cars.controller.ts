import { Controller, Get, Param, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarDTO } from './models/cars-dto';

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

  @Get('/:carId/image')
  async getCarImage(@Param('carId') carId: number, @Query('width') width, @Query('height') height,): Promise<Buffer>  {
    return await this.carsService.getCarImage(carId, +width, +height);
  }
}

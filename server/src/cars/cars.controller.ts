import { Controller, Get, Param, Query, Res, BadRequestException } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarDTO } from './models/cars-dto';
import { Response } from 'express';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) { }

  @Get()
  async getCars(): Promise<CarDTO[]> {
    return await this.carsService.getCars();
  }

  @Get('/:carId')
  async getCar(@Param('carId') carId: number): Promise<CarDTO> {
    return await this.carsService.getCar(carId);
  }

  @Get('/:carId/image')
  async getCarImage(@Param('carId') carId: number, @Query('width') width, @Query('height') height, @Res() res: Response): Promise<void> {

    const path = await this.carsService.getCarImage(carId, +width, +height);

    return res.sendFile(path, { root: 'src' });
  }
}

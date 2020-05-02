import { Controller, Get, Param, Query, Res } from '@nestjs/common';
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

  @Get('track/:imgId')
  test(@Param('imgId') imgId, @Res() res) {
    return res.sendFile('database/seed/car-images/BMW 520d - 1920x1080.jpg', { root: 'src' });
  }
}

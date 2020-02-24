import { Controller, Get, Post, Body, ValidationPipe } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentedCar } from '../database/entities/rentals.entity';
import { RentCarDTO } from './models/rentCar.dto';

@Controller('rentals')
export class RentalsController {

  constructor(
    readonly rentalsService: RentalsService,
  ) { }

  @Get()
  async getRentals(): Promise<RentedCar[]>  {
    return await this.rentalsService.getRenals();
  }

  @Post()
  async rentCar(@Body(new ValidationPipe({ transform: true, whitelist: true })) body: RentCarDTO ): Promise<RentedCar>  {
    const { carId, returnDate, client } = body;
    return await this.rentalsService.rentCar(carId, returnDate, client);
  }
}

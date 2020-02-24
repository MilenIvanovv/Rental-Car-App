import { Controller, Get, Post, Body } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentedCar } from '../database/entities/rentals.entity';
import { Client } from './models/client.dto';

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
  async rentCar(@Body('carId') carId: string, @Body('returnDate') returnDate: string, @Body('client') client: Client ): Promise<void>  {
    return await this.rentalsService.rentCar(carId, returnDate, client);
  }
}

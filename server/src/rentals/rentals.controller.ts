import { Controller, Get } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentedCar } from '../database/entities/rentals.entity';

@Controller('rentals')
export class RentalsController {

  constructor(
    readonly rentalsService: RentalsService,
  ) { }

  @Get()
  async getRentals(): Promise<RentedCar[]>  {
    return await this.rentalsService.getRenals();
  }
}

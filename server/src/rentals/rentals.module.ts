import { Module } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentedCar } from '../database/entities/rentals.entity';
import { Car } from '../database/entities/cars.entity';
import { CalculateRentService } from './calculate-rent.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RentedCar, Car]),
  ],
  providers: [RentalsService, CalculateRentService],
  controllers: [RentalsController]
})
export class RentalsModule {}

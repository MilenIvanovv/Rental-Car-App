import { Module } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentedCar } from '../database/entities/rentals.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RentedCar]),
  ],
  providers: [RentalsService],
  controllers: [RentalsController]
})
export class RentalsModule {}

import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { CarClass } from 'src/database/entities/class.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentedCar } from 'src/database/entities/rentals.entity';
import { Car } from 'src/database/entities/cars.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RentedCar, Car, CarClass]),
  ],
  providers: [ReportsService],
  controllers: [ReportsController]
})
export class ReportsModule {}

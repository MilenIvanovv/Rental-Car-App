import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { CarsModule } from './cars/cars.module';
import { RentalsModule } from './rentals/rentals.module';
import { ReportsModule } from './reports/reports.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [ConfigModule, DatabaseModule, CarsModule, RentalsModule, ReportsModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

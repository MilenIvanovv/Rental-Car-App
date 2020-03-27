import { Controller, Get, Body, ValidationPipe, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportPerClass } from './models/reportPerClass';

@Controller('reports')
export class ReportsController {

  constructor(private readonly repotsService: ReportsService) { }

  @Get('/class/averageDays')
  async getAverageDaysPerClass(): Promise<ReportPerClass<number>[]> {
    return await this.repotsService.getAverageDaysPerClass();
  }

  @Get('/class/currentRentedCars')
  async getCurrentlyRentedCars(): Promise<ReportPerClass<number>[]> {
    return await this.repotsService.getCurrentlyRentedCars();
  }

  @Get('/class/avgMonthlyIncome')
  async getAverageMonthlyIncome(@Query('year') year: number, @Query('month') month: number ): Promise<ReportPerClass<number>[]> {
    return await this.repotsService.getAverageMonthlyIncome(+year, +month);
  }
}

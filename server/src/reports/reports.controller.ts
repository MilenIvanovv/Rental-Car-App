import { Controller, Get, Body, ValidationPipe } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportPerClass } from './models/reportPerClass';
import { SelectedMonth } from './models/selectedMonth-dto';

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
  async getAverageMonthlyIncome(@Body(new ValidationPipe({ transform: true, whitelist: true })) body: SelectedMonth): Promise<ReportPerClass<number>[]> {
    return await this.repotsService.getAverageMonthlyIncome(body);
  }
}

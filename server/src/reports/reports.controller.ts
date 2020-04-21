import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportPerClass } from './models/reportPerClass';
import { ReportType } from '../common/report-type.enum';

@Controller('reports')
export class ReportsController {

  constructor(private readonly repotsService: ReportsService) { }

  @Get('/class/averageDays')
  async getAverageDaysPerClass(): Promise<ReportPerClass> {
    return await this.repotsService.getAverageDaysPerClass();
  }

  @Get('/class/currentRentedCars')
  async getCurrentlyRentedCars(): Promise<ReportPerClass> {
    return await this.repotsService.getCurrentlyRentedCars();
  }

  @Get('/class/avgMonthlyIncome')
  async getAverageMonthlyIncome(@Query('year') year: number, @Query('month') month: number ): Promise<ReportPerClass> {
    return await this.repotsService.getAverageMonthlyIncome(+year, +month);
  }

  @Get('/class/totalMonthly')
  async getTotalMonthly(@Query('year') year: number, @Query('month') month: number ): Promise<ReportPerClass> {
    return await this.repotsService.getTotalMonthly(+year, +month);
  }

  @Get('/class/yearly')
  async geYearly(@Query('year') year: number, @Query('type') type: ReportType ): Promise<ReportPerClass[]> {
    return await this.repotsService.getYearly(+year, type);
  }
}

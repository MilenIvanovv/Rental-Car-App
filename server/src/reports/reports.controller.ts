import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportPerClass } from './models/reportPerClass';
import { ReportType } from '../common/report-type.enum';
import { Aggregation } from '../common/array-extentions';

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
    return await this.repotsService.getMonthly(+year, +month);
  }

  @Get('/class/totalMonthly')
  async getTotalMonthly(@Query('year') year: number, @Query('month') month: number ): Promise<ReportPerClass> {
    const reportTypes = [ReportType.income, ReportType.expenses, ReportType.revenue];

    return await this.repotsService.getMonthly(+year, +month, reportTypes, Aggregation.total);
  }

  @Get('/class/yearly')
  async geYearly(@Query('year') year: number, @Query('type') type: ReportType ): Promise<ReportPerClass[]> {
    // TODO validate type
    return await this.repotsService.getYearly(+year, type ? [type] : undefined);
  }

  @Get('/class/yearlyRevenueAndIncome')
  async geYearlyRevenueAndExpenses(@Query('year') year: number): Promise<ReportPerClass[]> {
    return await this.repotsService.getYearly(+year, [ReportType.income, ReportType.revenue]);
  }

  @Get('/class/yearlyExpenses')
  async geYearlyExpenses(@Query('year') year: number): Promise<ReportPerClass[]> {
    return await this.repotsService.getYearly(+year, [ReportType.income, ReportType.insuaranceExpenses]);
  }
}

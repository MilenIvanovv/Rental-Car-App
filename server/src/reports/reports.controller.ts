import { Controller, Get } from '@nestjs/common';
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
}

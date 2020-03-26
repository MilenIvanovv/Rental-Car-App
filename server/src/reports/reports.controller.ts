import { Controller, Get } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AverageDaysByClass } from './models/averageDaysByClass';
import { CurRentedByClass } from './models/currentlyRentedCarsByClass';

@Controller('reports')
export class ReportsController {

  constructor(private readonly repotsService: ReportsService) {

  }

  @Get('/class/averageDays')
  async getAverageDaysPerClass(): Promise<AverageDaysByClass[]> {
    return await this.repotsService.getAverageDaysPerClass();
  }

  @Get('/class/currentRentedCars')
  async getCurrentlyRentedCars(): Promise<CurRentedByClass[]> {
    return await this.repotsService.getCurrentlyRentedCars();
  }
}

import { Controller, Get } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AverageDaysByClass } from './models/averageDaysByClass';

@Controller('reports')
export class ReportsController {

  constructor(private readonly repotsService: ReportsService) {

  }

  @Get('/class/averageDays')
  async getAverageDaysPerClass(): Promise<AverageDaysByClass[]> {
    return await this.repotsService.getAverageDaysPerClass();
  }
}

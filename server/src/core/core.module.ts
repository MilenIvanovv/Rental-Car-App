import { Module, Global } from '@nestjs/common';
import { CalculateRentService } from './calculate-rent.service';

@Global()
@Module({
  providers: [CalculateRentService],
  exports: [CalculateRentService],
})
export class CoreModule {}

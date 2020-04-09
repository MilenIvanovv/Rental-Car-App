import { Module, Global } from '@nestjs/common';
import { CalculateRentService } from './calculate-rent.service';
import { FsService } from './fs/fs.service';

@Global()
@Module({
  providers: [CalculateRentService, FsService],
  exports: [CalculateRentService],
})
export class CoreModule {}

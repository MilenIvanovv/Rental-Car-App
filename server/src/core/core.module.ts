import { Module, Global } from '@nestjs/common';
import { CalculateRentService } from './calculate-rent.service';
import { FsService } from './fs/fs.service';
import { JimpService } from './jimp.service';

@Global()
@Module({
  providers: [CalculateRentService, FsService, JimpService],
  exports: [CalculateRentService, FsService, JimpService],
})
export class CoreModule {
}

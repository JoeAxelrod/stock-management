import { Module } from '@nestjs/common';
import { FmpApiService } from './services/fmp-api.service';

@Module({
  providers: [FmpApiService],
  exports: [FmpApiService],
})
export class SharedModule {}
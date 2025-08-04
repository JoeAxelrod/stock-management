import { Module } from '@nestjs/common';
import { StockController } from './stock/stock.controller';
import { StockService } from './stock/stock.service';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SharedModule, AuthModule],
  controllers: [StockController],
  providers: [StockService],
  exports: [StockService],
})
export class StockModule {}

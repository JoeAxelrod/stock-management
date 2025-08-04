import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioModule } from './portfolio.module';
import { StockModule } from './stock.module';
import { StockService } from './stock/stock.service';
import { StockController } from './stock/stock.controller';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI as string),
    PortfolioModule,
    StockModule,
  ],
  controllers: [
    AppController,
    StockController,
  ],
  providers: [AppService, StockService],
})
export class AppModule {}

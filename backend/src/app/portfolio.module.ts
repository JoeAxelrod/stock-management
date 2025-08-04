import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioSchema } from './portfolio/portfolio.model';
import { PortfolioService } from './portfolio/portfolio.service';
import { PortfolioController } from './portfolio/portfolio.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Portfolio', schema: PortfolioSchema }]),
  ],
  providers: [PortfolioService],
  controllers: [PortfolioController],
  // no exports; portfolio logic only used internally by its controller
})
export class PortfolioModule {}

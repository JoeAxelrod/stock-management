// apps/backend/src/app/stock/stock.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { StockService } from './stock.service';

@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get(':symbol')
  getStock(@Param('symbol') symbol: string) {
    return this.stockService.fetchQuote(symbol);
  }
}

import { Controller, Get, Param, Query } from '@nestjs/common';
import { StockService } from './stock.service';

@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get(':symbol')
  getStock(@Param('symbol') symbol: string) {
    return this.stockService.fetchQuote(symbol);
  }

  @Get(':symbol/profile')
  getCompanyProfile(@Param('symbol') symbol: string) {
    return this.stockService.fetchCompanyProfile(symbol);
  }

  @Get(':symbol/historical')
  getHistoricalPrices(
    @Param('symbol') symbol: string,
    @Query('from') from?: string,
    @Query('to') to?: string
  ) {
    return this.stockService.fetchHistoricalPrices(symbol, from, to);
  }

  @Get('_debug/rate-limit-status')
  getRateLimitStatus() {
    return this.stockService.getRateLimiterStatus();
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { FmpApiService } from '../shared/services/fmp-api.service';

@Injectable()
export class StockService {
  private readonly logger = new Logger(StockService.name);

  constructor(private readonly fmpApiService: FmpApiService) {}

  /**
   * Fetch stock quote with rate limiting and retry logic
   */
  async fetchQuote(symbol: string) {
    this.logger.debug(`Fetching quote for symbol: ${symbol}`);
    return await this.fmpApiService.getQuote(symbol);
  }

  /**
   * Fetch company profile data
   */
  async fetchCompanyProfile(symbol: string) {
    this.logger.debug(`Fetching company profile for symbol: ${symbol}`);
    return await this.fmpApiService.getCompanyProfile(symbol);
  }

  /**
   * Fetch historical price data
   */
  async fetchHistoricalPrices(symbol: string, from?: string, to?: string) {
    this.logger.debug(`Fetching historical prices for symbol: ${symbol}`);
    return await this.fmpApiService.getHistoricalPrices(symbol, from, to);
  }

  /**
   * Get rate limiter status for debugging
   */
  getRateLimiterStatus() {
    return this.fmpApiService.getRateLimiterStatus();
  }
}

import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { StockService } from './stock.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser, Roles } from '../auth/decorators/auth.decorators';
import type { AuthUser } from '../auth/interfaces/auth.interface';

@Controller('stocks')
@UseGuards(AuthGuard)
export class StockController {
  constructor(private readonly stockService: StockService) {}

  /**
   * Get stock quote - requires authentication
   */
  @Get(':symbol')
  async getStock(
    @Param('symbol') symbol: string,
    @CurrentUser() user: AuthUser
  ) {
    const quote = await this.stockService.fetchQuote(symbol);
    return {
      ...quote,
      requestedBy: user.email,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Get company profile - requires authentication
   */
  @Get(':symbol/profile')
  async getCompanyProfile(
    @Param('symbol') symbol: string,
    @CurrentUser() user: AuthUser
  ) {
    const profile = await this.stockService.fetchCompanyProfile(symbol);
    return {
      ...profile,
      requestedBy: user.email,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Get historical data - requires trader role or admin
   */
  @Get(':symbol/historical')
  @Roles('trader', 'admin')
  async getHistoricalPrices(
    @Param('symbol') symbol: string,
    @CurrentUser() user: AuthUser,
    @Query('from') from?: string,
    @Query('to') to?: string
  ) {
    const data = await this.stockService.fetchHistoricalPrices(symbol, from, to);
    return {
      ...data,
      requestedBy: user.email,
      userRoles: user.roles,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Debug endpoint - admin only
   */
  @Get('_debug/rate-limit-status')
  @Roles('admin')
  getRateLimitStatus(@CurrentUser() user: AuthUser) {
    const status = this.stockService.getRateLimiterStatus();
    return {
      ...status,
      requestedBy: user.email,
      timestamp: new Date().toISOString()
    };
  }
}

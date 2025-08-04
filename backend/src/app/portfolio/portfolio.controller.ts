import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import axios from 'axios';
import { PortfolioService } from './portfolio.service';
import { AddStockDto } from './dto/add-stock.dto';
import { StockSymbolValidationPipe } from './validation/stock-symbol.pipe';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  /**
   * GET /portfolio
   * Returns the list of saved symbols.
   */
  @Get()
  async getPortfolio(): Promise<{ symbol: string }[]> {
    return this.portfolioService.findAll();
  }

  /**
   * POST /portfolio { symbol }
   * Adds a symbol to the portfolio.
   */
  @Post()
  async addStock(@Body() addStockDto: AddStockDto): Promise<{ symbol: string }[]> {
    await this.portfolioService.add(addStockDto.symbol);
    return this.portfolioService.findAll();
  }

  /**
   * DELETE /portfolio/:symbol
   * Removes a symbol from the portfolio.
   */
  @Delete(':symbol')
  async removeStock(@Param('symbol', StockSymbolValidationPipe) symbol: string): Promise<{ symbol: string }[]> {
    await this.portfolioService.remove(symbol);
    return this.portfolioService.findAll();
  }

  /**
   * GET /portfolio/:symbol
   * Returns the latest quote for the requested stock symbol.
   */
  @Get(':symbol')
  async getStock(@Param('symbol') symbol: string) {
    const url = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${process.env.FMP_API_KEY}`;

    const { data } = await axios.get(url);          // data is an array
    if (!data?.length) {
      return { message: `Symbol ${symbol} not found` };
    }
    return data[0]; // return the first (and only) quote object
  }
}

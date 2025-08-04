// apps/backend/src/app/stock/stock.service.ts
import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class StockService {
  async fetchQuote(symbol: string) {
    try {
      const { data } = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/${symbol}`,
        { params: { apikey: process.env.FMP_API_KEY } },
      );

      if (!data?.length) {
        // Symbol not found in FMP
        console.log('Symbol not found in FMP');
        throw new NotFoundException(`Symbol ${symbol} not found`);
      }

      return data[0];
    } catch (error: any) {
      // Axios errors have a response object when the server responded
      if (error?.isAxiosError && error.response) {
        const status: number = error.response.status;
        if (status === 404) {
          throw new NotFoundException(`Symbol ${symbol} not found`);
        }
        throw new HttpException(error.response.statusText, status);
      }

      // Fallback – service unavailable or other unknown issue
      throw new HttpException('FMP request failed', HttpStatus.BAD_GATEWAY);
    }
  }
}

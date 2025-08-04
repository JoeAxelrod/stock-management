import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { TokenBucketRateLimiter } from '../utils/rate-limiter';
import { RetryManager, RetryOptions } from '../utils/retry';

export interface FmpApiConfig {
  baseURL: string;
  apiKey: string;
  rateLimit: {
    capacity: number; // max burst requests
    refillRate: number; // requests per second
  };
  retry: Partial<RetryOptions>;
  timeout: number; // milliseconds
}

/**
 * FMP API wrapper with rate limiting and retry logic
 * Handles all Financial Modeling Prep API interactions
 */
@Injectable()
export class FmpApiService {
  private readonly logger = new Logger(FmpApiService.name);
  private readonly axiosInstance: AxiosInstance;
  private readonly rateLimiter: TokenBucketRateLimiter;
  private readonly retryOptions: Partial<RetryOptions>;

  constructor() {
    const config = this.getConfig();
    
    // Initialize rate limiter
    this.rateLimiter = new TokenBucketRateLimiter(
      config.rateLimit.capacity,
      config.rateLimit.refillRate
    );

    // Initialize axios instance
    this.axiosInstance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout,
      params: {
        apikey: config.apiKey
      }
    });

    this.retryOptions = config.retry;

    // Add request interceptor for logging
    this.axiosInstance.interceptors.request.use((request) => {
      this.logger.debug(`Making FMP API request: ${request.method?.toUpperCase()} ${request.url}`);
      return request;
    });

    // Add response interceptor for logging
    this.axiosInstance.interceptors.response.use(
      (response) => {
        this.logger.debug(`FMP API response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        if (error.response) {
          this.logger.warn(`FMP API error: ${error.response.status} ${error.config?.url} - ${error.response.statusText}`);
        } else {
          this.logger.error(`FMP API network error: ${error.message}`);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Make a rate-limited and retryable request to FMP API
   */
  async request<T = any>(
    endpoint: string,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    return this.executeWithRateLimitAndRetry(async () => {
      const response: AxiosResponse<T> = await this.axiosInstance.get(endpoint, config);
      return response.data;
    });
  }

  /**
   * Get stock quote data
   */
  async getQuote(symbol: string): Promise<any> {
    this.logger.debug(`Fetching quote for symbol: ${symbol}`);
    
    const data = await this.request(`/v3/quote/${symbol}`);
    
    if (!data?.length) {
      this.logger.warn(`Symbol ${symbol} not found in FMP`);
      throw new HttpException(`Symbol ${symbol} not found`, HttpStatus.NOT_FOUND);
    }

    return data[0];
  }

  /**
   * Get company profile data
   */
  async getCompanyProfile(symbol: string): Promise<any> {
    this.logger.debug(`Fetching company profile for symbol: ${symbol}`);
    
    const data = await this.request(`/v3/profile/${symbol}`);
    
    if (!data?.length) {
      this.logger.warn(`Company profile for ${symbol} not found in FMP`);
      throw new HttpException(`Company profile for ${symbol} not found`, HttpStatus.NOT_FOUND);
    }

    return data[0];
  }

  /**
   * Get historical price data
   */
  async getHistoricalPrices(symbol: string, from?: string, to?: string): Promise<any> {
    this.logger.debug(`Fetching historical prices for symbol: ${symbol}`);
    
    const params: any = {};
    if (from) params.from = from;
    if (to) params.to = to;

    const data = await this.request(`/v3/historical-price-full/${symbol}`, { params });
    
    if (!data?.historical?.length) {
      this.logger.warn(`Historical data for ${symbol} not found in FMP`);
      throw new HttpException(`Historical data for ${symbol} not found`, HttpStatus.NOT_FOUND);
    }

    return data;
  }

  /**
   * Execute function with rate limiting and retry logic
   */
  private async executeWithRateLimitAndRetry<T>(fn: () => Promise<T>): Promise<T> {
    // Wait for rate limit
    await this.rateLimiter.waitAndConsume();

    // Execute with retry logic
    const result = await RetryManager.executeWithRetry(fn, {
      ...this.retryOptions,
      retryCondition: (error: any) => {
        // Custom retry condition for FMP API
        if (error?.isAxiosError) {
          if (!error.response) return true; // Network error
          const status = error.response.status;
          
          // Retry on server errors, rate limits, and temporary issues
          if (status >= 500 || status === 429 || status === 503) {
            this.logger.warn(`Retrying due to status ${status}: ${error.response.statusText}`);
            return true;
          }
          
          // Don't retry on client errors (400-499) except rate limit
          if (status >= 400 && status < 500) {
            this.logger.debug(`Not retrying client error ${status}: ${error.response.statusText}`);
            return false;
          }
        }
        
        return false;
      }
    });

    this.logger.debug(`FMP API request completed after ${result.attemptsMade} attempts (${result.totalDelay}ms total delay)`);
    return result.result;
  }

  /**
   * Get configuration from environment variables
   */
  private getConfig(): FmpApiConfig {
    const apiKey = process.env.FMP_API_KEY;
    if (!apiKey) {
      throw new Error('FMP_API_KEY environment variable is required');
    }

    return {
      baseURL: 'https://financialmodelingprep.com/api',
      apiKey,
      rateLimit: {
        capacity: 10, // Allow burst of 10 requests
        refillRate: 2,  // 2 requests per second (conservative for free tier)
      },
      retry: {
        maxAttempts: 3,
        baseDelay: 1000,
        maxDelay: 10000,
        backoffMultiplier: 2,
        jitter: true
      },
      timeout: 10000 // 10 seconds
    };
  }

  /**
   * Get current rate limiter status (for debugging)
   */
  getRateLimiterStatus(): { tokens: number; capacity: number } {
    return {
      tokens: this.rateLimiter.getTokenCount(),
      capacity: 10
    };
  }
}
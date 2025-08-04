# FMP API Rate Limit & Retry Wrapper

This module provides a robust wrapper around the Financial Modeling Prep (FMP) API with built-in rate limiting and retry logic.

## Features

### Rate Limiting
- **Token Bucket Algorithm**: Allows burst traffic up to capacity while maintaining average rate
- **Default Configuration**: 10 requests burst capacity, 2 requests per second refill rate
- **Conservative Settings**: Designed for FMP free tier limitations

### Retry Logic
- **Exponential Backoff**: Progressively increases delay between retries
- **Jitter**: Adds randomness to prevent thundering herd problems
- **Smart Retry Conditions**: Only retries on network errors, 5xx server errors, and 429 rate limits
- **Default Configuration**: 3 max attempts, 1s base delay, 2x backoff multiplier

### Error Handling
- **Comprehensive Error Mapping**: Converts FMP API errors to appropriate HTTP exceptions
- **Structured Logging**: Detailed logs for debugging API interactions
- **Graceful Degradation**: Handles network failures and API downtime

## Usage

### In Services
```typescript
@Injectable()
export class StockService {
  constructor(private readonly fmpApiService: FmpApiService) {}

  async fetchQuote(symbol: string) {
    return await this.fmpApiService.getQuote(symbol);
  }
}
```

### Available Methods
- `getQuote(symbol: string)`: Get current stock quote
- `getCompanyProfile(symbol: string)`: Get company profile information
- `getHistoricalPrices(symbol: string, from?: string, to?: string)`: Get historical price data
- `getRateLimiterStatus()`: Get current rate limiter status for debugging

## Configuration

### Environment Variables
```bash
FMP_API_KEY=your_fmp_api_key_here
```

### Rate Limiting Configuration
The rate limiter is configured in `FmpApiService.getConfig()`:
- **Capacity**: 10 requests (burst allowance)
- **Refill Rate**: 2 requests per second
- **Timeout**: 10 seconds per request

### Retry Configuration
- **Max Attempts**: 3
- **Base Delay**: 1000ms
- **Max Delay**: 10000ms
- **Backoff Multiplier**: 2x
- **Jitter**: Enabled

## Monitoring

Use the debug endpoint to monitor rate limiter status:
```http
GET /stocks/_debug/rate-limit-status
```

Returns:
```json
{
  "tokens": 8,
  "capacity": 10
}
```

## Architecture

```
StockController → StockService → FmpApiService → [Rate Limiter + Retry Logic] → FMP API
```

The wrapper ensures all FMP API calls are:
1. Rate limited to respect API quotas
2. Automatically retried on transient failures
3. Properly logged for debugging
4. Converted to appropriate HTTP exceptions
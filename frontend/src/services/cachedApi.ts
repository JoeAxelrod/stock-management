import { api } from '../app/axios';
import { apiCache, getCacheKey, CACHE_TTL } from '../utils/cache';

interface PortfolioStock {
  symbol: string;
}

interface Stock {
  symbol: string;
  price: number;
  name?: string;
}

class CachedApiService {
  // Portfolio API calls
  async getPortfolio(): Promise<PortfolioStock[]> {
    const cacheKey = getCacheKey.portfolio();
    
    // Check cache first
    const cached = apiCache.get<PortfolioStock[]>(cacheKey);
    if (cached) {
      console.log('Cache hit: portfolio');
      return cached;
    }

    console.log('Cache miss: portfolio - Making API call');
    const response = await api.get<PortfolioStock[]>('/portfolio');
    const data = response.data;

    // Cache the result
    apiCache.set(cacheKey, data, CACHE_TTL.PORTFOLIO);
    console.log(`Cached: portfolio (TTL: ${CACHE_TTL.PORTFOLIO}ms)`);

    return data;
  }

  async addToPortfolio(symbol: string): Promise<void> {
    await api.post('/portfolio', { symbol });
    
    // Invalidate portfolio cache
    this.invalidatePortfolioCache();
  }

  async removeFromPortfolio(symbol: string): Promise<void> {
    await api.delete(`/portfolio/${symbol}`);
    
    // Invalidate portfolio cache
    this.invalidatePortfolioCache();
    
    // Also invalidate the specific stock cache
    this.invalidateStockCache(symbol);
  }

  // Stock API calls
  async getStock(symbol: string): Promise<Stock> {
    const cacheKey = getCacheKey.stock(symbol);
    
    // Check cache first
    const cached = apiCache.get<Stock>(cacheKey);
    if (cached) {
      console.log(`Cache hit: stock ${symbol}`);
      return cached;
    }

    console.log(`Cache miss: stock ${symbol} - Making API call`);
    const response = await api.get<Stock>(`/stocks/${symbol}`);
    const data = response.data;

    // Cache the result with stock quote TTL (60s)
    apiCache.set(cacheKey, data, CACHE_TTL.STOCK_QUOTE);
    console.log(`Cached: stock ${symbol} (TTL: ${CACHE_TTL.STOCK_QUOTE}ms)`);

    return data;
  }

  // Batch get stocks (useful for portfolio)
  async getStocks(symbols: string[]): Promise<Stock[]> {
    const promises = symbols.map(symbol => this.getStock(symbol));
    return Promise.all(promises);
  }

  // Cache invalidation methods
  invalidatePortfolioCache(): void {
    const cacheKey = getCacheKey.portfolio();
    apiCache.delete(cacheKey);
    console.log('Invalidated: portfolio cache');
  }

  invalidateStockCache(symbol: string): void {
    const cacheKey = getCacheKey.stock(symbol);
    apiCache.delete(cacheKey);
    console.log(`Invalidated: stock ${symbol} cache`);
  }

  invalidateAllStockCaches(): void {
    // Get all cache keys and remove stock-related ones
    const info = apiCache.getInfo();
    let invalidated = 0;

    info.entries.forEach(entry => {
      if (entry.key.startsWith('stock:')) {
        apiCache.delete(entry.key);
        invalidated++;
      }
    });

    console.log(`Invalidated ${invalidated} stock caches`);
  }

  // Cache management
  clearAllCache(): void {
    apiCache.clear();
    console.log('Cleared all cache');
  }

  getCacheStats() {
    return apiCache.getStats();
  }

  getCacheInfo() {
    return apiCache.getInfo();
  }

  cleanupExpiredCache(): number {
    const cleaned = apiCache.cleanup();
    if (cleaned > 0) {
      console.log(`Cleaned up ${cleaned} expired cache entries`);
    }
    return cleaned;
  }

  // Prefetch methods for better UX
  async prefetchPortfolioStocks(): Promise<void> {
    try {
      const portfolio = await this.getPortfolio();
      const symbols = portfolio.map(stock => stock.symbol);
      
      // Prefetch all stock details in parallel
      await Promise.allSettled(
        symbols.map(symbol => this.getStock(symbol))
      );
      
      console.log(`Prefetched ${symbols.length} stock details`);
    } catch (error) {
      console.error('Failed to prefetch portfolio stocks:', error);
    }
  }

  // Check if data is cached
  isPortfolioCached(): boolean {
    return apiCache.has(getCacheKey.portfolio());
  }

  isStockCached(symbol: string): boolean {
    return apiCache.has(getCacheKey.stock(symbol));
  }
}

// Export singleton instance
export const cachedApi = new CachedApiService();
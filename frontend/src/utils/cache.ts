interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

class Cache {
  private cache = new Map<string, CacheEntry<any>>();
  private defaultTTL = 60 * 1000; // 60 seconds in milliseconds

  set<T>(key: string, data: T, ttl?: number): void {
    const now = Date.now();
    const timeToLive = ttl || this.defaultTTL;
    
    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt: now + timeToLive,
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    const now = Date.now();
    
    // Check if expired
    if (now > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return false;
    }

    const now = Date.now();
    
    // Check if expired
    if (now > entry.expiresAt) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Get cache info for debugging
  getInfo() {
    const now = Date.now();
    const entries = Array.from(this.cache.entries()).map(([key, entry]) => ({
      key,
      age: now - entry.timestamp,
      timeToExpire: entry.expiresAt - now,
      expired: now > entry.expiresAt,
    }));

    return {
      size: this.cache.size,
      entries,
    };
  }

  // Cleanup expired entries
  cleanup(): number {
    const now = Date.now();
    let cleaned = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
        cleaned++;
      }
    }

    return cleaned;
  }

  // Get cache statistics
  getStats() {
    const now = Date.now();
    let expired = 0;
    let active = 0;

    for (const entry of this.cache.values()) {
      if (now > entry.expiresAt) {
        expired++;
      } else {
        active++;
      }
    }

    return {
      total: this.cache.size,
      active,
      expired,
    };
  }
}

// Create singleton cache instance
export const apiCache = new Cache();

// Cache key generators
export const getCacheKey = {
  portfolio: () => 'portfolio',
  stock: (symbol: string) => `stock:${symbol}`,
  stockQuote: (symbol: string) => `stock-quote:${symbol}`,
  stockHistory: (symbol: string, period: string) => `stock-history:${symbol}:${period}`,
};

// Cache TTL constants (in milliseconds)
export const CACHE_TTL = {
  STOCK_QUOTE: 60 * 1000,      // 60 seconds
  PORTFOLIO: 30 * 1000,        // 30 seconds
  STOCK_DETAILS: 5 * 60 * 1000, // 5 minutes
  STOCK_HISTORY: 10 * 60 * 1000, // 10 minutes
} as const;
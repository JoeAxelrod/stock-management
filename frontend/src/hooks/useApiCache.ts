import { useCallback, useEffect, useRef } from 'react';
import { apiCache, CACHE_TTL } from '../utils/cache';

interface UseApiCacheOptions {
  ttl?: number;
  key?: string;
  enabled?: boolean;
}

interface CachedApiCall<T> {
  (...args: any[]): Promise<T>;
}

export function useApiCache<T>(
  apiCall: (...args: any[]) => Promise<T>,
  options: UseApiCacheOptions = {}
) {
  const { ttl = CACHE_TTL.STOCK_QUOTE, enabled = true } = options;
  const abortControllerRef = useRef<AbortController | null>(null);

  // Generate cache key from function arguments
  const generateCacheKey = useCallback((args: any[]) => {
    if (options.key) {
      return `${options.key}:${JSON.stringify(args)}`;
    }
    return `api:${apiCall.name}:${JSON.stringify(args)}`;
  }, [options.key, apiCall.name]);

  // Cached API call function
  const cachedApiCall: CachedApiCall<T> = useCallback(async (...args: any[]) => {
    const cacheKey = generateCacheKey(args);

    // Return cached data if available and caching is enabled
    if (enabled) {
      const cached = apiCache.get<T>(cacheKey);
      if (cached !== null) {
        console.log(`Cache hit: ${cacheKey}`);
        return cached;
      }
    }

    // Cancel previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    try {
      console.log(`Cache miss: ${cacheKey} - Making API call`);
      const result = await apiCall(...args);

      // Cache the result if caching is enabled
      if (enabled) {
        apiCache.set(cacheKey, result, ttl);
        console.log(`Cached: ${cacheKey} (TTL: ${ttl}ms)`);
      }

      return result;
    } catch (error) {
      // Don't cache errors
      throw error;
    } finally {
      abortControllerRef.current = null;
    }
  }, [apiCall, generateCacheKey, enabled, ttl]);

  // Invalidate cache for specific key
  const invalidateCache = useCallback((args?: any[]) => {
    if (args) {
      const cacheKey = generateCacheKey(args);
      apiCache.delete(cacheKey);
      console.log(`Cache invalidated: ${cacheKey}`);
    } else {
      // Clear all cache if no specific args provided
      apiCache.clear();
      console.log('All cache cleared');
    }
  }, [generateCacheKey]);

  // Check if data is cached
  const isCached = useCallback((args: any[]) => {
    const cacheKey = generateCacheKey(args);
    return apiCache.has(cacheKey);
  }, [generateCacheKey]);

  // Get cached data without making API call
  const getCached = useCallback((args: any[]) => {
    const cacheKey = generateCacheKey(args);
    return apiCache.get<T>(cacheKey);
  }, [generateCacheKey]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    cachedApiCall,
    invalidateCache,
    isCached,
    getCached,
  };
}

// Specialized hook for stock quotes with 60s cache
export function useStockQuoteCache() {
  return useApiCache<any>(
    async (symbol: string) => {
      // This will be replaced with actual API call
      throw new Error('API call not implemented');
    },
    {
      ttl: CACHE_TTL.STOCK_QUOTE,
      key: 'stock-quote',
    }
  );
}

// Hook for portfolio caching
export function usePortfolioCache() {
  return useApiCache<any>(
    async () => {
      throw new Error('API call not implemented');
    },
    {
      ttl: CACHE_TTL.PORTFOLIO,
      key: 'portfolio',
    }
  );
}
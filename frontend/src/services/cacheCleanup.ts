import { cachedApi } from './cachedApi';

class CacheCleanupService {
  private cleanupInterval: NodeJS.Timeout | null = null;
  private readonly CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 minutes

  start(): void {
    if (this.cleanupInterval) {
      return; // Already running
    }

    console.log('Starting cache cleanup service');
    
    // Run cleanup immediately
    this.cleanup();
    
    // Schedule periodic cleanup
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, this.CLEANUP_INTERVAL);
  }

  stop(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
      console.log('Stopped cache cleanup service');
    }
  }

  private cleanup(): void {
    const cleaned = cachedApi.cleanupExpiredCache();
    if (cleaned > 0) {
      console.log(`Cache cleanup: removed ${cleaned} expired entries`);
    }
  }

  // Manual cleanup trigger
  triggerCleanup(): number {
    return cachedApi.cleanupExpiredCache();
  }

  // Get service status
  isRunning(): boolean {
    return this.cleanupInterval !== null;
  }
}

// Export singleton instance
export const cacheCleanupService = new CacheCleanupService();

// Auto-start in browser environment
if (typeof window !== 'undefined') {
  // Start cleanup service when module loads
  cacheCleanupService.start();
  
  // Stop cleanup service when page unloads
  window.addEventListener('beforeunload', () => {
    cacheCleanupService.stop();
  });
}
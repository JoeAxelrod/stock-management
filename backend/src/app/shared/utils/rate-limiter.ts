/**
 * Token bucket rate limiter implementation
 * Allows burst traffic up to the bucket capacity while maintaining average rate
 */
export class TokenBucketRateLimiter {
  private tokens: number;
  private lastRefill: number;
  private readonly capacity: number;
  private readonly refillRate: number; // tokens per second

  constructor(capacity: number, refillRate: number) {
    this.capacity = capacity;
    this.refillRate = refillRate;
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }

  /**
   * Try to consume a token. Returns true if successful, false if rate limited
   */
  async tryConsume(): Promise<boolean> {
    this.refillTokens();
    
    if (this.tokens >= 1) {
      this.tokens -= 1;
      return true;
    }
    
    return false;
  }

  /**
   * Wait until a token is available, then consume it
   */
  async waitAndConsume(): Promise<void> {
    while (!(await this.tryConsume())) {
      // Wait for the next token to become available
      const waitTime = Math.max(1000 / this.refillRate, 10);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }

  private refillTokens(): void {
    const now = Date.now();
    const timePassed = (now - this.lastRefill) / 1000; // seconds
    const tokensToAdd = Math.floor(timePassed * this.refillRate);
    
    if (tokensToAdd > 0) {
      this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
      this.lastRefill = now;
    }
  }

  /**
   * Get current token count (for debugging)
   */
  getTokenCount(): number {
    this.refillTokens();
    return this.tokens;
  }
}
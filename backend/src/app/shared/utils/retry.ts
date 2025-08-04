/**
 * Retry utility with exponential backoff and jitter
 */
export interface RetryOptions {
  maxAttempts: number;
  baseDelay: number; // milliseconds
  maxDelay: number; // milliseconds
  backoffMultiplier: number;
  jitter: boolean;
  retryCondition?: (error: any) => boolean;
}

export interface RetryResult<T> {
  result: T;
  attemptsMade: number;
  totalDelay: number;
}

export class RetryManager {
  private static readonly DEFAULT_OPTIONS: RetryOptions = {
    maxAttempts: 3,
    baseDelay: 1000,
    maxDelay: 30000,
    backoffMultiplier: 2,
    jitter: true,
    retryCondition: (error: any) => {
      // Default: retry on network errors and 5xx status codes
      if (error?.isAxiosError) {
        if (!error.response) return true; // Network error
        const status = error.response.status;
        return status >= 500 || status === 429; // Server errors or rate limit
      }
      return false;
    }
  };

  /**
   * Execute a function with retry logic
   */
  static async executeWithRetry<T>(
    fn: () => Promise<T>,
    options: Partial<RetryOptions> = {}
  ): Promise<RetryResult<T>> {
    const opts = { ...this.DEFAULT_OPTIONS, ...options };
    let lastError: any;
    let totalDelay = 0;

    for (let attempt = 1; attempt <= opts.maxAttempts; attempt++) {
      try {
        const result = await fn();
        return {
          result,
          attemptsMade: attempt,
          totalDelay
        };
      } catch (error) {
        lastError = error;

        // Check if we should retry this error
        if (!opts.retryCondition?.(error)) {
          throw error;
        }

        // Don't delay on the last attempt
        if (attempt === opts.maxAttempts) {
          break;
        }

        // Calculate delay with exponential backoff
        let delay = Math.min(
          opts.baseDelay * Math.pow(opts.backoffMultiplier, attempt - 1),
          opts.maxDelay
        );

        // Add jitter to prevent thundering herd
        if (opts.jitter) {
          delay = delay * (0.5 + Math.random() * 0.5);
        }

        totalDelay += delay;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError;
  }

  /**
   * Create a sleep function with jitter
   */
  static sleep(ms: number, jitter = true): Promise<void> {
    const delay = jitter ? ms * (0.5 + Math.random() * 0.5) : ms;
    return new Promise(resolve => setTimeout(resolve, delay));
  }
}
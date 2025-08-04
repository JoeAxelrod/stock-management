import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthUser, ValidatedToken } from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  
  // Simple in-memory token store for demo (replace with Redis/DB in production)
  private readonly validTokens = new Map<string, AuthUser>();
  
  constructor() {
    // Initialize with some demo tokens for testing
    this.initializeDemoTokens();
  }

  /**
   * Validate an auth token
   */
  validateToken(token: string): ValidatedToken {
    try {
      // Remove 'Bearer ' prefix if present
      const cleanToken = token.replace(/^Bearer\s+/, '');
      
      if (!cleanToken) {
        return { valid: false, error: 'No token provided' };
      }

      // Check if token exists in our store
      const user = this.validTokens.get(cleanToken);
      
      if (!user) {
        return { valid: false, error: 'Invalid token' };
      }

      // Check if token is expired (24 hours)
      const tokenAge = Date.now() - user.tokenIssued;
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours
      
      if (tokenAge > maxAge) {
        this.validTokens.delete(cleanToken);
        return { valid: false, error: 'Token expired' };
      }

      this.logger.debug(`Token validated for user: ${user.email}`);
      return { valid: true, user };

    } catch (error: any) {
      this.logger.error(`Token validation error: ${error.message}`);
      return { valid: false, error: 'Token validation failed' };
    }
  }

  /**
   * Generate a new auth token (for demo purposes)
   */
  generateToken(email: string, roles: string[] = ['user']): string {
    const token = this.generateRandomToken();
    const user: AuthUser = {
      id: this.generateUserId(email),
      email,
      roles,
      tokenIssued: Date.now()
    };
    
    this.validTokens.set(token, user);
    this.logger.debug(`Generated token for user: ${email}`);
    
    return token;
  }

  /**
   * Revoke a token
   */
  revokeToken(token: string): boolean {
    const cleanToken = token.replace(/^Bearer\s+/, '');
    const removed = this.validTokens.delete(cleanToken);
    
    if (removed) {
      this.logger.debug(`Token revoked: ${cleanToken.substring(0, 8)}...`);
    }
    
    return removed;
  }

  /**
   * Get user from token (throws if invalid)
   */
  getUserFromToken(token: string): AuthUser {
    const result = this.validateToken(token);
    
    if (!result.valid || !result.user) {
      throw new UnauthorizedException(result.error || 'Invalid token');
    }
    
    return result.user;
  }

  /**
   * Check if user has required role
   */
  hasRole(user: AuthUser, requiredRole: string): boolean {
    return user.roles.includes(requiredRole) || user.roles.includes('admin');
  }

  /**
   * Get all active tokens (for debugging)
   */
  getActiveTokenCount(): number {
    return this.validTokens.size;
  }

  private initializeDemoTokens(): void {
    // Create some demo tokens for testing
    const demoTokens = [
      { email: 'admin@example.com', roles: ['admin', 'user'] },
      { email: 'user@example.com', roles: ['user'] },
      { email: 'trader@example.com', roles: ['trader', 'user'] }
    ];

    demoTokens.forEach(({ email, roles }) => {
      const token = this.generateToken(email, roles);
      this.logger.log(`Demo token for ${email}: ${token}`);
    });
  }

  private generateRandomToken(): string {
    return 'st_' + Math.random().toString(36).substring(2) + 
           Math.random().toString(36).substring(2) + 
           Date.now().toString(36);
  }

  private generateUserId(email: string): string {
    return 'user_' + Buffer.from(email).toString('base64').substring(0, 8);
  }
}
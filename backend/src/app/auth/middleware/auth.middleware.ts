import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);

  constructor(private readonly authService: AuthService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
      try {
        const result = this.authService.validateToken(authHeader);
        
        if (result.valid && result.user) {
          req.user = result.user;
          this.logger.debug(`Authenticated user: ${result.user.email}`);
        } else {
          this.logger.debug(`Invalid token: ${result.error}`);
        }
      } catch (error: any) {
        this.logger.warn(`Auth middleware error: ${error.message}`);
      }
    }

    next();
  }
}
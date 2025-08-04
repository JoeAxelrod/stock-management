import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../services/auth.service';
import { ROLES_KEY, SKIP_AUTH_KEY } from '../decorators/auth.decorators';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // Check if auth should be skipped for this route
    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (skipAuth) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No authorization header provided');
    }

    const result = this.authService.validateToken(authHeader);

    if (!result.valid || !result.user) {
      throw new UnauthorizedException(result.error || 'Invalid token');
    }

    // Check role requirements
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requiredRoles) {
      const hasRole = requiredRoles.some(role => 
        this.authService.hasRole(result.user!, role)
      );

      if (!hasRole) {
        throw new UnauthorizedException(
          `Access denied. Required roles: ${requiredRoles.join(', ')}`
        );
      }
    }

    // Attach user to request
    request.user = result.user;
    
    this.logger.debug(`Access granted to ${result.user.email} for ${request.method} ${request.url}`);
    return true;
  }
}
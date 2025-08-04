import { SetMetadata } from '@nestjs/common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const SKIP_AUTH_KEY = 'skipAuth';

/**
 * Decorator to require specific roles for a route
 * @param roles - Array of required roles
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

/**
 * Decorator to skip authentication for a route
 */
export const SkipAuth = () => SetMetadata(SKIP_AUTH_KEY, true);

/**
 * Decorator to inject the current user into a controller method
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
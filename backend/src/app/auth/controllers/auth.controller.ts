import { 
  Controller, 
  Post, 
  Get, 
  Body, 
  Headers, 
  UseGuards,
  Logger 
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser, SkipAuth, Roles } from '../decorators/auth.decorators';
import type { AuthUser } from '../interfaces/auth.interface';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  /**
   * Generate a new token (demo endpoint)
   */
  @Post('login')
  @SkipAuth()
  login(@Body() loginRequest: LoginDto) {
    const { email, roles = ['user'] } = loginRequest;
    
    this.logger.log(`Login request for: ${email}`);
    
    const token = this.authService.generateToken(email, roles);
    
    return {
      message: 'Login successful',
      token,
      user: {
        email,
        roles
      },
      expiresIn: '24h'
    };
  }

  /**
   * Validate current token
   */
  @Get('me')
  @UseGuards(AuthGuard)
  getCurrentUser(@CurrentUser() user: AuthUser) {
    return {
      message: 'Token is valid',
      user: {
        id: user.id,
        email: user.email,
        roles: user.roles,
        tokenAge: Date.now() - user.tokenIssued
      }
    };
  }

  /**
   * Logout (revoke token)
   */
  @Post('logout')
  @UseGuards(AuthGuard)
  logout(@Headers('authorization') authHeader: string) {
    const revoked = this.authService.revokeToken(authHeader);
    
    return {
      message: revoked ? 'Logout successful' : 'Token not found',
      revoked
    };
  }

  /**
   * Admin endpoint to see active tokens
   */
  @Get('status')
  @UseGuards(AuthGuard)
  @Roles('admin')
  getAuthStatus(@CurrentUser() user: AuthUser) {
    return {
      message: 'Auth status',
      requestedBy: user.email,
      activeTokens: this.authService.getActiveTokenCount(),
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Public endpoint for testing
   */
  @Get('health')
  @SkipAuth()
  healthCheck() {
    return {
      message: 'Auth service is healthy',
      timestamp: new Date().toISOString()
    };
  }
}
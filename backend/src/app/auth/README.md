# Simple Auth Token Middleware

A lightweight token-based authentication system for the backend API with role-based access control.

## Features

### Core Components
- **Token Validation**: Simple token-based authentication
- **Role-Based Access**: Support for user roles (`user`, `admin`)  
- **Middleware Integration**: Global auth middleware for all routes
- **Guard Protection**: Declarative route protection with decorators
- **In-Memory Storage**: Fast token validation (demo implementation)

### Security Features
- **Token Expiration**: 24-hour token lifetime
- **Automatic Cleanup**: Expired tokens are automatically removed
- **Request Logging**: Comprehensive auth logging for debugging [[memory:3776011]]
- **Error Handling**: Detailed error messages for troubleshooting

## Quick Start

### 1. Get a Token
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "roles": ["user"]
}
```

Response:
```json
{
  "message": "Login successful",
  "token": "st_abc123...",
  "user": { "email": "user@example.com", "roles": ["user"] },
  "expiresIn": "24h"
}
```

### 2. Use Token in Requests
```bash
GET /stocks/AAPL
Authorization: Bearer st_abc123...
```

## Available Endpoints

### Auth Endpoints
- `POST /auth/login` - Generate token (public)
- `GET /auth/me` - Validate current token
- `POST /auth/logout` - Revoke token  
- `GET /auth/status` - Admin: View active tokens
- `GET /auth/health` - Health check (public)

### Protected Stock Endpoints
- `GET /stocks/:symbol` - Get quote (requires: user+)
- `GET /stocks/:symbol/profile` - Get profile (requires: user+)
- `GET /stocks/:symbol/historical` - Get historical data (requires: admin)
- `GET /stocks/_debug/rate-limit-status` - Debug info (requires: admin)

## Usage in Controllers

### Protecting Routes
```typescript
@Controller('api')
@UseGuards(AuthGuard)  // Protect entire controller
export class MyController {
  
  @Get('public')
  @SkipAuth()  // Skip auth for this route
  publicEndpoint() {
    return { message: 'Public data' };
  }

  @Get('user-data')
  // Requires any authenticated user
  userData(@CurrentUser() user: AuthUser) {
    return { user: user.email };
  }

  @Get('admin-data')
  @Roles('admin')  // Requires admin role
  adminData(@CurrentUser() user: AuthUser) {
    return { adminData: 'sensitive' };
  }
}
```

### Available Decorators
- `@SkipAuth()` - Skip authentication for route
- `@Roles('role1', 'role2')` - Require specific roles
- `@CurrentUser()` - Inject authenticated user object
- `@UseGuards(AuthGuard)` - Apply auth guard

## Demo Tokens

The system initializes with demo tokens for testing:

| Email | Roles | Use Case |
|-------|-------|----------|
| `admin@example.com` | `admin`, `user` | Full access |
| `user@example.com` | `user` | Basic access |

## Architecture

```
Request → AuthMiddleware → AuthGuard → Controller
    ↓         ↓             ↓
  Extract   Validate    Check Roles
  Token     Token       & Inject User
```

### Flow:
1. **Middleware**: Extracts token from headers, validates it, attaches user to request
2. **Guard**: Checks if route needs auth, validates roles, throws exceptions
3. **Decorators**: Inject user data or skip auth as needed

## Configuration

### Environment Variables
None required for basic setup - uses in-memory storage.

### Customization
Edit `AuthService.initializeDemoTokens()` to change demo users or `AuthService.validateToken()` to modify token validation logic.

## Production Considerations

⚠️ **Current Limitations:**
- **In-Memory Storage**: Tokens are lost on restart
- **Simple Tokens**: No JWT or cryptographic signing
- **No Persistence**: No database integration

🔧 **Production Improvements:**
- Replace with JWT tokens
- Use Redis for token storage
- Add refresh token support
- Integrate with real user database
- Add password hashing and validation

## Testing

```bash
# Get a token
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'

# Use token  
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/stocks/AAPL

# Check auth status
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/auth/me
```

The system provides a solid foundation for authentication while remaining simple and extensible.
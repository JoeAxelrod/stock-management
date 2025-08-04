import { api } from '../app/axios';

export interface LoginRequest {
  email: string;
  roles?: string[];
}

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    email: string;
    roles: string[];
  };
  expiresIn: string;
}

export interface AuthStatusResponse {
  message: string;
  user: {
    id: string;
    email: string;
    roles: string[];
    tokenAge: number;
  };
}

class AuthApiService {
  /**
   * Login and get auth token
   */
  async login(email: string, roles?: string[]): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/api/auth/login', { email, roles });
    return response.data;
  }

  /**
   * Validate current token and get user info
   */
  async getMe(): Promise<AuthStatusResponse> {
    const response = await api.get<AuthStatusResponse>('/api/auth/me');
    return response.data;
  }

  /**
   * Logout and revoke token
   */
  async logout(): Promise<{ message: string; revoked: boolean }> {
    const response = await api.post('/api/auth/logout');
    return response.data;
  }

  /**
   * Get auth service status (admin only)
   */
  async getAuthStatus(): Promise<any> {
    const response = await api.get('/api/auth/status');
    return response.data;
  }

  /**
   * Health check (public endpoint)
   */
  async healthCheck(): Promise<{ message: string; timestamp: string }> {
    const response = await api.get('/api/auth/health');
    return response.data;
  }
}

export const authApi = new AuthApiService();
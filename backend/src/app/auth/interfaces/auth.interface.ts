export interface AuthUser {
  id: string;
  email: string;
  roles: string[];
  tokenIssued: number;
}

export interface TokenPayload {
  sub: string; // user id
  email: string;
  roles: string[];
  iat: number; // issued at
  exp: number; // expires at
}

export interface ValidatedToken {
  valid: boolean;
  user?: AuthUser;
  error?: string;
}
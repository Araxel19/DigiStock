export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  organizationId: string;
  isSuperAdmin: boolean;
  roles: string[];
  created_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  organizationName: string;
}
export interface RegisterResponse {
  message: string;
}

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
}
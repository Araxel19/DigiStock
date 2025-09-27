import { api } from './api'
import type { LoginCredentials, LoginResponse } from '@/types/auth'
import type { FrontendCreateUserDto } from '@/types/user'

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },

  async register(userData: FrontendCreateUserDto) {
    const response = await api.post('/users', userData) // The endpoint is now /users
    return response.data
  },
}

import { Injectable } from '@nestjs/common';
import { AuthService } from 'digistock-business-logic';
import { UsersService } from '../users/users.service';
import { JwtServiceAdapter } from '../../adapters/jwt.service.adapter';

@Injectable()
export class AuthServiceAdapter {
  private authService: AuthService;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtServiceAdapter: JwtServiceAdapter,
  ) {
    this.authService = new AuthService(
      this.usersService as any,
      this.jwtServiceAdapter,
    );
  }

  async validateUser(email: string, password: string): Promise<any> {
    return await this.authService.validateUser(email, password);
  }

  async login(loginDto: any) {
    return await this.authService.login(loginDto);
  }

  async register(createUserDto: any) {
    return await this.authService.register(createUserDto);
  }
}

// Alias para compatibilidad
export { AuthServiceAdapter as AuthService };
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';
import { IJwtService } from '../interfaces/repositories.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject('IJwtService')
    private readonly jwtService: IJwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const roles = user.userRoles.map(userRole => userRole.role.name);

    const payload = { 
      email: user.email, 
      sub: user.id, 
      organizationId: user.organizationId,
      isSuperAdmin: user.isSuperAdmin,
      roles: roles,
    };

    // The user object returned to the frontend should also be updated
    const userResponse = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        organizationId: user.organizationId,
        isSuperAdmin: user.isSuperAdmin,
        roles: roles,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: userResponse,
    };
  }

  async register(createUserDto: CreateUserDto) {
    // The create method in user service already hashes the password
    const user = await this.userService.create(createUserDto);
    // The create method already returns the user without the password
    return user;
  }
}
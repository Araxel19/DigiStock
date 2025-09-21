import { Injectable } from '@nestjs/common';
import { UserService } from 'digistock-business-logic';
import { UserRepositoryAdapter } from '../../adapters/user.repository.adapter';

@Injectable()
export class UsersService {
  private userService: UserService;

  constructor(
    private readonly userRepositoryAdapter: UserRepositoryAdapter,
  ) {
    this.userService = new UserService(this.userRepositoryAdapter);
  }

  async create(createUserDto: any): Promise<any> {
    return await this.userService.create(createUserDto);
  }

  async findAll(): Promise<any[]> {
    return await this.userService.findAll();
  }

  async findById(id: string): Promise<any> {
    return await this.userService.findById(id);
  }

  async findByEmail(email: string): Promise<any | null> {
    return await this.userService.findByEmail(email);
  }

  async update(id: string, updateUserDto: any): Promise<any> {
    return await this.userService.update(id, updateUserDto);
  }

  async remove(id: string): Promise<void> {
    return await this.userService.remove(id);
  }
}

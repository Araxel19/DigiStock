import { Injectable } from '@nestjs/common';
import { UserService as BusinessUserService } from 'digistock-business-logic';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly businessUserService: BusinessUserService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    return await this.businessUserService.create(createUserDto);
  }

  async findAll(): Promise<any[]> {
    return await this.businessUserService.findAll();
  }

  async findById(id: string): Promise<any> {
    return await this.businessUserService.findById(id);
  }

  async findByEmail(email: string): Promise<any | null> {
    return await this.businessUserService.findByEmail(email);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    return await this.businessUserService.update(id, updateUserDto);
  }

  async remove(id: string): Promise<void> {
    return await this.businessUserService.remove(id);
  }
}
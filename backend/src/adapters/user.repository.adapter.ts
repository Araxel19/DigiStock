import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'digistock-business-logic';
import { IUserRepository } from 'digistock-business-logic';

@Injectable()
export class UserRepositoryAdapter implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(entity: Partial<User>): User {
    return this.userRepository.create(entity);
  }

  async save(entity: User): Promise<User> {
    return await this.userRepository.save(entity);
  }

  async find(options?: any): Promise<User[]> {
    return await this.userRepository.find(options);
  }

  async findOne(options: any): Promise<User | null> {
    return await this.userRepository.findOne(options);
  }

  async update(criteria: any, partialEntity: any): Promise<any> {
    return await this.userRepository.update(criteria, partialEntity);
  }

  async delete(criteria: any): Promise<any> {
    return await this.userRepository.delete(criteria);
  }
}

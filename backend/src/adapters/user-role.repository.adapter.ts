import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { UserRole, IUserRoleRepository } from 'digistock-business-logic';

@Injectable()
export class UserRoleRepositoryAdapter implements IUserRoleRepository {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {}

  get manager(): EntityManager {
    return this.userRoleRepository.manager;
  }

  create(entity: Partial<UserRole>): UserRole {
    return this.userRoleRepository.create(entity);
  }

  async save(entity: UserRole): Promise<UserRole> {
    return await this.userRoleRepository.save(entity);
  }

  async find(options?: any): Promise<UserRole[]> {
    return await this.userRoleRepository.find(options);
  }

  async findOne(options: any): Promise<UserRole | null> {
    return await this.userRoleRepository.findOne(options);
  }

  async update(criteria: any, partialEntity: any): Promise<any> {
    return await this.userRoleRepository.update(criteria, partialEntity);
  }

  async delete(criteria: any): Promise<any> {
    return await this.userRoleRepository.delete(criteria);
  }
}

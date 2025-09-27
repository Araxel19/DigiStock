import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Role, IRoleRepository } from 'digistock-business-logic';

@Injectable()
export class RoleRepositoryAdapter implements IRoleRepository {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  get manager(): EntityManager {
    return this.roleRepository.manager;
  }

  create(entity: Partial<Role>): Role {
    return this.roleRepository.create(entity);
  }

  async save(entity: Role): Promise<Role> {
    return await this.roleRepository.save(entity);
  }

  async find(options?: any): Promise<Role[]> {
    return await this.roleRepository.find(options);
  }

  async findOne(options: any): Promise<Role | null> {
    return await this.roleRepository.findOne(options);
  }

  async update(criteria: any, partialEntity: any): Promise<any> {
    return await this.roleRepository.update(criteria, partialEntity);
  }

  async delete(criteria: any): Promise<any> {
    return await this.roleRepository.delete(criteria);
  }

  async softDelete(criteria: any): Promise<any> {
    return await this.roleRepository.softDelete(criteria);
  }
}

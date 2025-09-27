import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Organization, IOrganizationRepository } from 'digistock-business-logic';

@Injectable()
export class OrganizationRepositoryAdapter implements IOrganizationRepository {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  get manager(): EntityManager {
    return this.organizationRepository.manager;
  }

  create(entity: Partial<Organization>): Organization {
    return this.organizationRepository.create(entity);
  }

  async save(entity: Organization): Promise<Organization> {
    return await this.organizationRepository.save(entity);
  }

  async find(options?: any): Promise<Organization[]> {
    return await this.organizationRepository.find(options);
  }

  async findOne(options: any): Promise<Organization | null> {
    return await this.organizationRepository.findOne(options);
  }

  async update(criteria: any, partialEntity: any): Promise<any> {
    return await this.organizationRepository.update(criteria, partialEntity);
  }

  async delete(criteria: any): Promise<any> {
    return await this.organizationRepository.delete(criteria);
  }

  async softDelete(criteria: any): Promise<any> {
    return await this.organizationRepository.softDelete(criteria);
  }
}

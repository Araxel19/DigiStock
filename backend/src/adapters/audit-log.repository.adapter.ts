import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { AuditLog, IAuditLogRepository } from 'digistock-business-logic';

@Injectable()
export class AuditLogRepositoryAdapter implements IAuditLogRepository {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogRepository: Repository<AuditLog>,
  ) {}

  get manager(): EntityManager {
    return this.auditLogRepository.manager;
  }

  create(entity: Partial<AuditLog>): AuditLog {
    return this.auditLogRepository.create(entity);
  }

  async save(entity: AuditLog): Promise<AuditLog> {
    return await this.auditLogRepository.save(entity);
  }

  async find(options?: any): Promise<AuditLog[]> {
    return await this.auditLogRepository.find(options);
  }

  async findOne(options: any): Promise<AuditLog | null> {
    return await this.auditLogRepository.findOne(options);
  }

  async update(criteria: any, partialEntity: any): Promise<any> {
    return await this.auditLogRepository.update(criteria, partialEntity);
  }

  async delete(criteria: any): Promise<any> {
    return await this.auditLogRepository.delete(criteria);
  }

  async softDelete(criteria: any): Promise<any> {
    return await this.auditLogRepository.softDelete(criteria);
  }
}

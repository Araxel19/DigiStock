import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Alert, IAlertRepository } from 'digistock-business-logic';

@Injectable()
export class AlertRepositoryAdapter implements IAlertRepository {
  constructor(
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,
  ) {}

  get manager(): EntityManager {
    return this.alertRepository.manager;
  }

  create(entity: Partial<Alert>): Alert {
    return this.alertRepository.create(entity);
  }

  async save(entity: Alert): Promise<Alert> {
    return await this.alertRepository.save(entity);
  }

  async find(options?: any): Promise<Alert[]> {
    return await this.alertRepository.find(options);
  }

  async findOne(options: any): Promise<Alert | null> {
    return await this.alertRepository.findOne(options);
  }

  async update(criteria: any, partialEntity: any): Promise<any> {
    return await this.alertRepository.update(criteria, partialEntity);
  }

  async delete(criteria: any): Promise<any> {
    return await this.alertRepository.delete(criteria);
  }

  async softDelete(criteria: any): Promise<any> {
    return await this.alertRepository.softDelete(criteria);
  }
}

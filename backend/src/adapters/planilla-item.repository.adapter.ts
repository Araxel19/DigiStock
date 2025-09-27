import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { PlanillaItem, IPlanillaItemRepository } from 'digistock-business-logic';

@Injectable()
export class PlanillaItemRepositoryAdapter implements IPlanillaItemRepository {
  constructor(
    @InjectRepository(PlanillaItem)
    private readonly planillaItemRepository: Repository<PlanillaItem>,
  ) {}

  get manager(): EntityManager {
    return this.planillaItemRepository.manager;
  }

  create(entity: Partial<PlanillaItem>): PlanillaItem {
    return this.planillaItemRepository.create(entity);
  }

  async save(entity: PlanillaItem): Promise<PlanillaItem> {
    return await this.planillaItemRepository.save(entity);
  }

  async find(options?: any): Promise<PlanillaItem[]> {
    return await this.planillaItemRepository.find(options);
  }

  async findOne(options: any): Promise<PlanillaItem | null> {
    return await this.planillaItemRepository.findOne(options);
  }

  async update(criteria: any, partialEntity: any): Promise<any> {
    return await this.planillaItemRepository.update(criteria, partialEntity);
  }

  async delete(criteria: any): Promise<any> {
    return await this.planillaItemRepository.delete(criteria);
  }

  async softDelete(criteria: any): Promise<any> {
    return await this.planillaItemRepository.softDelete(criteria);
  }
}

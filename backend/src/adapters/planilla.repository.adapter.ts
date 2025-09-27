import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Planilla } from 'digistock-business-logic';
import { IPlanillaRepository } from 'digistock-business-logic';

@Injectable()
export class PlanillaRepositoryAdapter implements IPlanillaRepository {
  constructor(
    @InjectRepository(Planilla)
    private readonly planillaRepository: Repository<Planilla>,
  ) {}

  get manager(): EntityManager {
    return this.planillaRepository.manager;
  }

  create(entity: Partial<Planilla>): Planilla {
    return this.planillaRepository.create(entity);
  }

  async save(entity: Planilla): Promise<Planilla> {
    return await this.planillaRepository.save(entity);
  }

  async find(options?: any): Promise<Planilla[]> {
    return await this.planillaRepository.find(options);
  }

  async findOne(options: any): Promise<Planilla | null> {
    return await this.planillaRepository.findOne(options);
  }

  async update(criteria: any, partialEntity: any): Promise<any> {
    return await this.planillaRepository.update(criteria, partialEntity);
  }

  async delete(criteria: any): Promise<any> {
    return await this.planillaRepository.delete(criteria);
  }

  async softDelete(criteria: any): Promise<any> {
    return await this.planillaRepository.softDelete(criteria);
  }
}


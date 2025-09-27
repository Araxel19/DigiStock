import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Report, IReportRepository } from 'digistock-business-logic';

@Injectable()
export class ReportRepositoryAdapter implements IReportRepository {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}

  get manager(): EntityManager {
    return this.reportRepository.manager;
  }

  create(entity: Partial<Report>): Report {
    return this.reportRepository.create(entity);
  }

  async save(entity: Report): Promise<Report> {
    return await this.reportRepository.save(entity);
  }

  async find(options?: any): Promise<Report[]> {
    return await this.reportRepository.find(options);
  }

  async findOne(options: any): Promise<Report | null> {
    return await this.reportRepository.findOne(options);
  }

  async update(criteria: any, partialEntity: any): Promise<any> {
    return await this.reportRepository.update(criteria, partialEntity);
  }

  async delete(criteria: any): Promise<any> {
    return await this.reportRepository.delete(criteria);
  }
}

import { Repository, EntityManager } from 'typeorm';
import { Report, IReportRepository } from 'digistock-business-logic';
export declare class ReportRepositoryAdapter implements IReportRepository {
    private readonly reportRepository;
    constructor(reportRepository: Repository<Report>);
    get manager(): EntityManager;
    create(entity: Partial<Report>): Report;
    save(entity: Report): Promise<Report>;
    find(options?: any): Promise<Report[]>;
    findOne(options: any): Promise<Report | null>;
    update(criteria: any, partialEntity: any): Promise<any>;
    delete(criteria: any): Promise<any>;
    softDelete(criteria: any): Promise<any>;
}

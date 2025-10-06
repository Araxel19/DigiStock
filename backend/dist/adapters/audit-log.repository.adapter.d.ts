import { Repository, EntityManager } from 'typeorm';
import { AuditLog, IAuditLogRepository } from 'digistock-business-logic';
export declare class AuditLogRepositoryAdapter implements IAuditLogRepository {
    private readonly auditLogRepository;
    constructor(auditLogRepository: Repository<AuditLog>);
    get manager(): EntityManager;
    create(entity: Partial<AuditLog>): AuditLog;
    save(entity: AuditLog): Promise<AuditLog>;
    find(options?: any): Promise<AuditLog[]>;
    findOne(options: any): Promise<AuditLog | null>;
    update(criteria: any, partialEntity: any): Promise<any>;
    delete(criteria: any): Promise<any>;
    softDelete(criteria: any): Promise<any>;
}

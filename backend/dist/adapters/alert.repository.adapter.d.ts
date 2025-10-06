import { Repository, EntityManager } from 'typeorm';
import { Alert, IAlertRepository } from 'digistock-business-logic';
export declare class AlertRepositoryAdapter implements IAlertRepository {
    private readonly alertRepository;
    constructor(alertRepository: Repository<Alert>);
    get manager(): EntityManager;
    create(entity: Partial<Alert>): Alert;
    save(entity: Alert): Promise<Alert>;
    find(options?: any): Promise<Alert[]>;
    findOne(options: any): Promise<Alert | null>;
    update(criteria: any, partialEntity: any): Promise<any>;
    delete(criteria: any): Promise<any>;
    softDelete(criteria: any): Promise<any>;
}

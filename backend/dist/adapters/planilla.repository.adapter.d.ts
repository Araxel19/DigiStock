import { Repository, EntityManager } from 'typeorm';
import { Planilla } from 'digistock-business-logic';
import { IPlanillaRepository } from 'digistock-business-logic';
export declare class PlanillaRepositoryAdapter implements IPlanillaRepository {
    private readonly planillaRepository;
    constructor(planillaRepository: Repository<Planilla>);
    get manager(): EntityManager;
    create(entity: Partial<Planilla>): Planilla;
    save(entity: Planilla): Promise<Planilla>;
    find(options?: any): Promise<Planilla[]>;
    findOne(options: any): Promise<Planilla | null>;
    update(criteria: any, partialEntity: any): Promise<any>;
    delete(criteria: any): Promise<any>;
    softDelete(criteria: any): Promise<any>;
}

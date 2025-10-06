import { Repository, EntityManager } from 'typeorm';
import { PlanillaItem, IPlanillaItemRepository } from 'digistock-business-logic';
export declare class PlanillaItemRepositoryAdapter implements IPlanillaItemRepository {
    private readonly planillaItemRepository;
    constructor(planillaItemRepository: Repository<PlanillaItem>);
    get manager(): EntityManager;
    create(entity: Partial<PlanillaItem>): PlanillaItem;
    save(entity: PlanillaItem): Promise<PlanillaItem>;
    find(options?: any): Promise<PlanillaItem[]>;
    findOne(options: any): Promise<PlanillaItem | null>;
    update(criteria: any, partialEntity: any): Promise<any>;
    delete(criteria: any): Promise<any>;
    softDelete(criteria: any): Promise<any>;
}

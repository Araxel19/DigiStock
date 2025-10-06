import { Repository, EntityManager } from 'typeorm';
import { InventorySnapshot, IInventorySnapshotRepository } from 'digistock-business-logic';
export declare class InventorySnapshotRepositoryAdapter implements IInventorySnapshotRepository {
    private readonly inventorySnapshotRepository;
    constructor(inventorySnapshotRepository: Repository<InventorySnapshot>);
    get manager(): EntityManager;
    create(entity: Partial<InventorySnapshot>): InventorySnapshot;
    save(entity: InventorySnapshot): Promise<InventorySnapshot>;
    find(options?: any): Promise<InventorySnapshot[]>;
    findOne(options: any): Promise<InventorySnapshot | null>;
    update(criteria: any, partialEntity: any): Promise<any>;
    delete(criteria: any): Promise<any>;
    softDelete(criteria: any): Promise<any>;
}

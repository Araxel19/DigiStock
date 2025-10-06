import { Repository, EntityManager } from 'typeorm';
import { Location, ILocationRepository } from 'digistock-business-logic';
export declare class LocationRepositoryAdapter implements ILocationRepository {
    private readonly locationRepository;
    constructor(locationRepository: Repository<Location>);
    get manager(): EntityManager;
    create(entity: Partial<Location>): Location;
    save(entity: Location): Promise<Location>;
    find(options?: any): Promise<Location[]>;
    findOne(options: any): Promise<Location | null>;
    update(criteria: any, partialEntity: any): Promise<any>;
    delete(criteria: any): Promise<any>;
    softDelete(criteria: any): Promise<any>;
}

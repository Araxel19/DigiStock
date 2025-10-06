import { Repository, EntityManager } from 'typeorm';
import { Role, IRoleRepository } from 'digistock-business-logic';
export declare class RoleRepositoryAdapter implements IRoleRepository {
    private readonly roleRepository;
    constructor(roleRepository: Repository<Role>);
    get manager(): EntityManager;
    create(entity: Partial<Role>): Role;
    save(entity: Role): Promise<Role>;
    find(options?: any): Promise<Role[]>;
    findOne(options: any): Promise<Role | null>;
    update(criteria: any, partialEntity: any): Promise<any>;
    delete(criteria: any): Promise<any>;
    softDelete(criteria: any): Promise<any>;
}

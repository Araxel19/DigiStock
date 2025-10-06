import { Repository, EntityManager } from 'typeorm';
import { UserRole, IUserRoleRepository } from 'digistock-business-logic';
export declare class UserRoleRepositoryAdapter implements IUserRoleRepository {
    private readonly userRoleRepository;
    constructor(userRoleRepository: Repository<UserRole>);
    get manager(): EntityManager;
    create(entity: Partial<UserRole>): UserRole;
    save(entity: UserRole): Promise<UserRole>;
    find(options?: any): Promise<UserRole[]>;
    findOne(options: any): Promise<UserRole | null>;
    update(criteria: any, partialEntity: any): Promise<any>;
    delete(criteria: any): Promise<any>;
    softDelete(criteria: any): Promise<any>;
}

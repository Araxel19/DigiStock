import { Repository, EntityManager } from 'typeorm';
import { User } from 'digistock-business-logic';
import { IUserRepository } from 'digistock-business-logic';
export declare class UserRepositoryAdapter implements IUserRepository {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    get manager(): EntityManager;
    create(entity: Partial<User>): User;
    save(entity: User): Promise<User>;
    find(options?: any): Promise<User[]>;
    findOne(options: any): Promise<User | null>;
    update(criteria: any, partialEntity: any): Promise<any>;
    delete(criteria: any): Promise<any>;
    softDelete(criteria: any): Promise<any>;
}

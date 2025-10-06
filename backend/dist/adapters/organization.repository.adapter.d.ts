import { Repository, EntityManager } from 'typeorm';
import { Organization, IOrganizationRepository } from 'digistock-business-logic';
export declare class OrganizationRepositoryAdapter implements IOrganizationRepository {
    private readonly organizationRepository;
    constructor(organizationRepository: Repository<Organization>);
    get manager(): EntityManager;
    create(entity: Partial<Organization>): Organization;
    save(entity: Organization): Promise<Organization>;
    find(options?: any): Promise<Organization[]>;
    findOne(options: any): Promise<Organization | null>;
    update(criteria: any, partialEntity: any): Promise<any>;
    delete(criteria: any): Promise<any>;
    softDelete(criteria: any): Promise<any>;
}

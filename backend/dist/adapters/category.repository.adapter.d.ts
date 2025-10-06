import { Repository, EntityManager } from 'typeorm';
import { Category, ICategoryRepository } from 'digistock-business-logic';
export declare class CategoryRepositoryAdapter implements ICategoryRepository {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    get manager(): EntityManager;
    create(entity: Partial<Category>): Category;
    save(entity: Category): Promise<Category>;
    find(options?: any): Promise<Category[]>;
    findOne(options: any): Promise<Category | null>;
    update(criteria: any, partialEntity: any): Promise<any>;
    delete(criteria: any): Promise<any>;
    softDelete(criteria: any): Promise<any>;
}

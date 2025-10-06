import { Repository, EntityManager } from 'typeorm';
import { Product } from 'digistock-business-logic';
import { IProductRepository } from 'digistock-business-logic';
export declare class ProductRepositoryAdapter implements IProductRepository {
    private readonly productRepository;
    constructor(productRepository: Repository<Product>);
    get manager(): EntityManager;
    create(entity: Partial<Product>): Product;
    save(entity: Product): Promise<Product>;
    find(options?: any): Promise<Product[]>;
    findOne(options: any): Promise<Product | null>;
    update(criteria: any, partialEntity: any): Promise<any>;
    delete(criteria: any): Promise<any>;
    softDelete(criteria: any): Promise<any>;
}

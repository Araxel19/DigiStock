import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Product } from 'digistock-business-logic';
import { IProductRepository } from 'digistock-business-logic';

@Injectable()
export class ProductRepositoryAdapter implements IProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  get manager(): EntityManager {
    return this.productRepository.manager;
  }

  create(entity: Partial<Product>): Product {
    return this.productRepository.create(entity);
  }

  async save(entity: Product): Promise<Product> {
    return await this.productRepository.save(entity);
  }

  async find(options?: any): Promise<Product[]> {
    return await this.productRepository.find(options);
  }

  async findOne(options: any): Promise<Product | null> {
    return await this.productRepository.findOne(options);
  }

  async update(criteria: any, partialEntity: any): Promise<any> {
    return await this.productRepository.update(criteria, partialEntity);
  }

  async delete(criteria: any): Promise<any> {
    return await this.productRepository.delete(criteria);
  }
}

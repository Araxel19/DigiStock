import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Category, ICategoryRepository } from 'digistock-business-logic';

@Injectable()
export class CategoryRepositoryAdapter implements ICategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  get manager(): EntityManager {
    return this.categoryRepository.manager;
  }

  create(entity: Partial<Category>): Category {
    return this.categoryRepository.create(entity);
  }

  async save(entity: Category): Promise<Category> {
    return await this.categoryRepository.save(entity);
  }

  async find(options?: any): Promise<Category[]> {
    return await this.categoryRepository.find(options);
  }

  async findOne(options: any): Promise<Category | null> {
    return await this.categoryRepository.findOne(options);
  }

  async update(criteria: any, partialEntity: any): Promise<any> {
    return await this.categoryRepository.update(criteria, partialEntity);
  }

  async delete(criteria: any): Promise<any> {
    return await this.categoryRepository.delete(criteria);
  }
}

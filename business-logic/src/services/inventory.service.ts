import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import {
  Product,
  Planilla,
  PlanillaItem,
  Category,
  Location,
} from '../entities';
import {
  CreateProductDto,
  UpdateProductDto,
  CreatePlanillaDto,
  UpdatePlanillaDto,
} from '../dto';
import {
  IProductRepository,
  IPlanillaRepository,
  IPlanillaItemRepository,
  ICategoryRepository,
  ILocationRepository,
} from '../interfaces/repositories.interface';
import { Like } from 'typeorm';

@Injectable()
export class InventoryService {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
    @Inject('IPlanillaRepository')
    private readonly planillaRepository: IPlanillaRepository,
    @Inject('IPlanillaItemRepository')
    private readonly planillaItemRepository: IPlanillaItemRepository,
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
    @Inject('ILocationRepository')
    private readonly locationRepository: ILocationRepository,
  ) {}

  // Product methods
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAllProducts(organizationId: string, search?: string): Promise<Product[]> {
    const where = search
      ? [
          { name: Like(`%${search}%`), organizationId },
          { code: Like(`%${search}%`), organizationId },
        ]
      : { organizationId };

    return this.productRepository.find({ where, relations: ['category', 'location'] });
  }

  async findProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id }, relations: ['category', 'location'] });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    await this.productRepository.update(id, updateProductDto);
    return this.findProductById(id);
  }

  async removeProduct(id: string): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Product not found');
    }
  }

  // Planilla methods
  async createPlanilla(createPlanillaDto: CreatePlanillaDto): Promise<Planilla> {
    const planilla = this.planillaRepository.create(createPlanillaDto);
    return this.planillaRepository.save(planilla);
  }

    async findAllPlanillas(organizationId: string): Promise<any[]> {
    const planillas = await this.planillaRepository.find({
      where: { organizationId },
      order: { createdAt: 'DESC' },
      relations: ['user'],
    });
    return planillas.map(p => ({ ...p, user: p.user ? { id: p.user.id, firstName: p.user.firstName, lastName: p.user.lastName } : null }));
  }

  async findPlanillasByUserId(userId: string): Promise<Planilla[]> {
    return this.planillaRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      relations: ['user'],
    });
  }

  async findPlanillaById(id: string): Promise<Planilla> {
    const planilla = await this.planillaRepository.findOne({
      where: { id },
      relations: ['user', 'organization', 'items', 'items.correctedProduct'],
    });
    if (!planilla) {
      throw new NotFoundException('Planilla not found');
    }
    return planilla;
  }

  async updatePlanilla(id: string, updatePlanillaDto: UpdatePlanillaDto): Promise<Planilla> {
    await this.planillaRepository.update(id, updatePlanillaDto);
    return this.findPlanillaById(id);
  }
  
  async removePlanilla(id: string): Promise<void> {
    const result = await this.planillaRepository.delete(id);
    if (result.affected === 0) {
        throw new NotFoundException('Planilla not found');
    }
  }

  // ... other methods for categories, locations, planillaItems
}
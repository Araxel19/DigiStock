import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Planilla } from '../entities/planilla.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { CreatePlanillaDto } from '../dto/create-planilla.dto';

export interface IProductRepository {
  create(entity: Partial<Product>): Product;
  save(entity: Product): Promise<Product>;
  find(options?: any): Promise<Product[]>;
  findOne(options: any): Promise<Product | null>;
  update(criteria: any, partialEntity: any): Promise<any>;
  delete(criteria: any): Promise<any>;
}

export interface IPlanillaRepository {
  create(entity: Partial<Planilla>): Planilla;
  save(entity: Planilla): Promise<Planilla>;
  find(options?: any): Promise<Planilla[]>;
  findOne(options: any): Promise<Planilla | null>;
  update(criteria: any, partialEntity: any): Promise<any>;
  delete(criteria: any): Promise<any>;
}

@Injectable()
export class InventoryService {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly planillaRepository: IPlanillaRepository,
  ) { }

  // Product methods
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async findAllProducts(search?: string): Promise<Product[]> {
    const where = search
      ? [
        { name: Like(`%${search}%`) },
        { code: Like(`%${search}%`) },
      ]
      : {};

    return await this.productRepository.find({ where });
  }

  async findProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    return product;
  }

  // Planilla methods
  async createPlanilla(createPlanillaDto: CreatePlanillaDto): Promise<Planilla> {
    const planilla = this.planillaRepository.create({
      ...createPlanillaDto,
      status: createPlanillaDto.status as any,
    });
    return await this.planillaRepository.save(planilla);
  }

  async findAllPlanillas(): Promise<Planilla[]> {
    return await this.planillaRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findPlanillaById(id: string): Promise<Planilla> {
    const planilla = await this.planillaRepository.findOne({ where: { id } });

    if (!planilla) {
      throw new NotFoundException('Planilla no encontrada');
    }

    return planilla;
  }

  async updatePlanillaStatus(id: string, status: string): Promise<Planilla> {
    await this.planillaRepository.update(id, {
      status: status as any,
      processedAt: status === 'processed' ? new Date() : null
    });
    return this.findPlanillaById(id);
  }
}

import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import {
  Product,
  Planilla,
  PlanillaItem,
  Category,
  Location,
  InventorySnapshot,
} from '../entities';
import {
  CreateProductDto,
  UpdateProductDto,
  CreatePlanillaDto,
  UpdatePlanillaDto,
  CreateN8nPlanillaDto,
  ValidatedPlanillaDto,
} from '../dto';
import {
  IProductRepository,
  IPlanillaRepository,
  IPlanillaItemRepository,
  ICategoryRepository,
  ILocationRepository,
  IInventorySnapshotRepository,
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
    @Inject('IInventorySnapshotRepository')
    private readonly inventorySnapshotRepository: IInventorySnapshotRepository,
  ) { }

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
      order: { uploadedAt: 'DESC' },
      relations: ['user'],
    });
    return planillas.map(p => ({ ...p, user: p.user ? { id: p.user.id, firstName: p.user.firstName, lastName: p.user.lastName } : null }));
  }

  async findPlanillasByUserId(userId: string): Promise<Planilla[]> {
    return this.planillaRepository.find({
      where: { userId },
      order: { uploadedAt: 'DESC' },
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

  async saveValidatedPlanillaItems(
    planillaId: string,
    validatedPlanillaDto: ValidatedPlanillaDto,
  ): Promise<Planilla> {
    const planilla = await this.findPlanillaById(planillaId);
    if (!planilla) {
      throw new NotFoundException(`La planilla con ID ${planillaId} no fue encontrada.`);
    }

    await this.planillaItemRepository.delete({ planillaId });

    try {
      for (const item of validatedPlanillaDto.items) {
        // Hotfix: Access properties using the actual keys from the request body.
        const detectedCode = item['DETECTED CODE'];
        const detectedName = item['DETECTED NAME'];
        const correctedQuantity = item['CORRECTED QUANTITY'];
        // This field from the UI contains a product CODE, not a UUID ID.
        const correctedProductCode = item['CORRECTED PRODUCT ID'];

        let product: Product | null = null;

        // 1. Prioritize finding the product by the user-corrected code.
        if (correctedProductCode && correctedProductCode.length > 0) {
          product = await this.productRepository.findOne({ where: { code: correctedProductCode, organizationId: planilla.organizationId } });
        }

        // 2. If not found, fall back to the originally detected code.
        if (!product && detectedCode) {
          product = await this.productRepository.findOne({ where: { code: detectedCode, organizationId: planilla.organizationId } });
        }
        
        // 3. If still not found, try the detected name.
        if (!product && detectedName) {
          product = await this.productRepository.findOne({ where: { name: detectedName, organizationId: planilla.organizationId } });
        }

        // 4. If the product still doesn't exist, create it using the best available info.
        if (!product && detectedName && detectedCode) {
          product = await this.createProduct({
            name: detectedName,
            code: detectedCode, // Use the originally detected code for the new product
            organizationId: planilla.organizationId,
          });
        }

        // 5. Create the inventory snapshot if we have a product and a quantity.
        if (product && correctedQuantity !== null) {
          const snapshot = this.inventorySnapshotRepository.create({
            productId: product.id,
            planillaId: planillaId,
            stockQuantity: Number(correctedQuantity) || 0,
            snapshotDate: new Date(),
            organizationId: planilla.organizationId,
          });
          await this.inventorySnapshotRepository.save(snapshot);
        }

        // 6. Save the planilla item itself for auditing.
        const newItem = this.planillaItemRepository.create({
          ...item, // Spread original data
          planillaId,
          correctedProductId: product ? product.id : null, // Link to the actual product UUID
          detectedCode: detectedCode,
          detectedName: detectedName,
          correctedQuantity: Number(correctedQuantity) || null,
        });
        await this.planillaItemRepository.save(newItem);
      }

      // 7. Update the planilla status.
      await this.planillaRepository.update(planillaId, {
        status: 'procesado',
        processedAt: new Date(),
      });

      return this.findPlanillaById(planillaId);

    } catch (error) {
      console.error('Error saving validated planilla items:', error);
      throw error;
    }
  }
}
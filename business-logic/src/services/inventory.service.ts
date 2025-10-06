import { Injectable, NotFoundException, Inject, UnauthorizedException } from '@nestjs/common';
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
    const product = await this.findProductById(id);
    if (updateProductDto.organizationId && product.organizationId !== updateProductDto.organizationId) {
      throw new UnauthorizedException('You are not allowed to update this product.');
    }
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
    // HACK: Force file change for build cache
    planillaId: string,
    validatedPlanillaDto: ValidatedPlanillaDto,
  ): Promise<Planilla> {
    const planilla = await this.planillaRepository.findOne({ where: { id: planillaId } });
    if (!planilla) {
      throw new NotFoundException(`Planilla with ID ${planillaId} not found.`);
    }
    const { organizationId } = planilla;

    return this.productRepository.manager.transaction(async transactionalEntityManager => {
      const productRepo = transactionalEntityManager.getRepository(Product);
      const categoryRepo = transactionalEntityManager.getRepository(Category);
      const locationRepo = transactionalEntityManager.getRepository(Location);
      const planillaItemRepo = transactionalEntityManager.getRepository(PlanillaItem);
      const planillaRepo = transactionalEntityManager.getRepository(Planilla);

      await planillaItemRepo.delete({ planillaId });

      for (const item of validatedPlanillaDto.items) {
        // --- Define keys based on ACTUAL request data from Vue component ---
        const productCode = item['codigo'];
        const productName = item['nombre_del_producto'];
        const productDescription = item['descripcion'];
        const categoryName = item['categoria'];
        const locationName = item['ubicacion'];
        const quantity = Number(item['cantidad'] || 0);
        const price = Number(item['precio'] || 0);

        let matchStatus: 'matched' | 'unmatched' | 'manual_override' | 'ambiguous' = 'unmatched';

        // --- Get or Create Category ---
        let category: Category | null = null;
        if (categoryName && categoryName !== 'Sin categoría') {
          category = await categoryRepo.createQueryBuilder("category")
            .where("LOWER(category.name) = LOWER(:name)", { name: categoryName })
            .andWhere("category.organizationId = :organizationId", { organizationId })
            .getOne();
          if (!category) {
            category = await categoryRepo.save({ name: categoryName, organizationId });
          }
        }

        // --- Get or Create Location ---
        let location: Location | null = null;
        if (locationName && locationName !== 'No asignada') {
          location = await locationRepo.createQueryBuilder("location")
            .where("LOWER(location.name) = LOWER(:name)", { name: locationName })
            .andWhere("location.organizationId = :organizationId", { organizationId })
            .getOne();
          if (!location) {
            location = await locationRepo.save({ name: locationName, organizationId });
          }
        }

        // --- Get or Create Product ---
        let product: Product | null = null;
        if (productCode && productCode !== '---') {
          product = await productRepo.findOne({ where: { code: productCode, organizationId } });
        }

        if (product) {
          // Product exists: update its quantity and other details
          product.cantidad = (product.cantidad || 0) + quantity;
          product.price = price;
          product.description = productDescription;
          product.categoryId = category ? category.id : product.categoryId;
          product.locationId = location ? location.id : product.locationId;
          await productRepo.save(product);
          matchStatus = 'matched';
        } else if (productCode && productCode !== '---' && productName && productName !== 'Sin nombre') {
          // Product does not exist: create it
          const newProductData = {
            organizationId,
            code: productCode,
            name: productName,
            description: productDescription,
            cantidad: quantity,
            price: price,
            categoryId: category ? category.id : null,
            locationId: location ? location.id : null,
          };
          product = await productRepo.save(newProductData);
          matchStatus = 'manual_override';
        }

        // --- Create PlanillaItem for Auditing ---
        if (product) {
          const newPlanillaItemData = {
            planillaId,
            detectedCode: productCode,
            detectedName: productName,
            detectedQuantity: quantity,
            correctedProductId: product.id,
            correctedQuantity: quantity,
            matchStatus: matchStatus,
          };
          await planillaItemRepo.save(newPlanillaItemData);
        }
      }

      await planillaRepo.update(planillaId, {
        status: 'procesado',
        processedAt: new Date(),
        validatedAt: new Date(),
      });

      return this.findPlanillaById(planillaId);
    });
  }

  async getDashboardStats(organizationId: string) {
    // HACK: Force file change for build cache
    const totalProducts = (await this.productRepository.find({ where: { organizationId } })).length;

    const processedPlanillasCount = (await this.planillaRepository.find({
      where: { organizationId, status: 'procesado' },
    })).length;

    const pendingPlanillasCount = (await this.planillaRepository.find({
      where: { organizationId, status: 'validacion_pendiente' },
    })).length;

    const processedPlanillas = await this.planillaRepository.find({
      where: { organizationId, status: 'procesado' },
      relations: ['items'],
    });

    let ocrSuccessRate = 0;
    if (processedPlanillas.length > 0) {
      const successRates = processedPlanillas.map(p => {
        if (p.items.length === 0) return 0;
        const matchedItems = p.items.filter(i => i.matchStatus === 'matched').length;
        return (matchedItems / p.items.length) * 100;
      });
      ocrSuccessRate = successRates.reduce((acc, rate) => acc + rate, 0) / successRates.length;
    }

    const recentPlanillas = await this.planillaRepository.find({
      where: { organizationId, status: 'procesado' },
      order: { processedAt: 'DESC' },
      take: 2,
    });

    const recentProducts = await this.productRepository.find({
      where: { organizationId },
      order: { createdAt: 'DESC' },
      take: 3,
    });

    return {
      totalProducts,
      processedPlanillas: processedPlanillasCount,
      pendingPlanillas: pendingPlanillasCount,
      ocrSuccessRate: Math.round(ocrSuccessRate),
      recentActivity: {
        planillas: recentPlanillas,
        products: recentProducts,
      },
    };
  }
}
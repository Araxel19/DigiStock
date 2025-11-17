import { Injectable } from '@nestjs/common';
import { InventoryService as BusinessInventoryService, ValidatedPlanillaDto } from 'digistock-business-logic';
import { DataSource } from 'typeorm';
import { CreateProductDto, UpdateProductDto, CreatePlanillaDto, UpdatePlanillaDto, CreateCategoryDto, UpdateCategoryDto} from './dto';

@Injectable()
export class InventoryService {
  constructor(
    private readonly businessInventoryService: BusinessInventoryService,
    private readonly dataSource: DataSource,
  ) { }

  // Product methods
  createProduct(createProductDto: CreateProductDto) {
    return this.businessInventoryService.createProduct(createProductDto);
  }

  findAllProducts(organizationId: string, search?: string) {
    return this.businessInventoryService.findAllProducts(organizationId, search);
  }

  findProductById(id: string) {
    return this.businessInventoryService.findProductById(id);
  }

  updateProduct(id: string, updateProductDto: UpdateProductDto) {
    return this.businessInventoryService.updateProduct(id, updateProductDto);
  }

  removeProduct(id: string) {
    return this.businessInventoryService.removeProduct(id);
  }

  // Category methods
  createCategory(createCategoryDto: CreateCategoryDto) {
    return this.businessInventoryService.createCategory(createCategoryDto);
  }

  findAllCategories(organizationId: string) {
    return this.businessInventoryService.findAllCategories(organizationId);
  }

  findCategoryById(id: string) {
    return this.businessInventoryService.findCategoryById(id);
  }

  updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.businessInventoryService.updateCategory(id, updateCategoryDto);
  }

  removeCategory(id: string) {
    return this.businessInventoryService.removeCategory(id);
  }

  // Planilla methods
  createPlanilla(createPlanillaDto: CreatePlanillaDto) {
    return this.businessInventoryService.createPlanilla(createPlanillaDto);
  }

  findAllPlanillas(organizationId: string) {
    return this.businessInventoryService.findAllPlanillas(organizationId);
  }

  findPlanillasByUserId(userId: string) {
    return this.businessInventoryService.findPlanillasByUserId(userId);
  }

  findPlanillaById(id: string) {
    return this.businessInventoryService.findPlanillaById(id);
  }

  updatePlanilla(id: string, updatePlanillaDto: UpdatePlanillaDto) {
    return this.businessInventoryService.updatePlanilla(id, updatePlanillaDto);
  }

  removePlanilla(id: string) {
    return this.businessInventoryService.removePlanilla(id);
  }

  saveValidatedPlanillaItems(id: string, validatedPlanillaDto: ValidatedPlanillaDto) {
    return this.businessInventoryService.saveValidatedPlanillaItems(id, validatedPlanillaDto);
  }

  getDashboardStats(organizationId: string) {
    return this.businessInventoryService.getDashboardStats(organizationId);
  }
  getUserDashboardStats(userId: string) {
    return this.businessInventoryService.getUserDashboardStats(userId);
  }

  async getInventoryCost(organizationId?: string) {
    // Sum price * cantidad from products. If organizationId provided, filter by it.
    const sql = organizationId
      ? `SELECT SUM(price * cantidad) as total FROM products WHERE organization_id = $1`
      : `SELECT SUM(price * cantidad) as total FROM products`;

    const rows = organizationId
      ? await this.dataSource.query(sql, [organizationId])
      : await this.dataSource.query(sql);

    const total = Number(rows?.[0]?.total || 0);
    return { total };
  }
}
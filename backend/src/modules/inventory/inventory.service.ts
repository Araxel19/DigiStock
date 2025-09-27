import { Injectable } from '@nestjs/common';
import { InventoryService as BusinessInventoryService } from 'digistock-business-logic';
import { CreateProductDto, UpdateProductDto, CreatePlanillaDto, UpdatePlanillaDto } from './dto';

@Injectable()
export class InventoryService {
  constructor(
    private readonly businessInventoryService: BusinessInventoryService,
  ) {}

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
}

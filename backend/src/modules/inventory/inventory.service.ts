import { Injectable } from '@nestjs/common';
import { InventoryService } from 'digistock-business-logic';
import { ProductRepositoryAdapter } from '../../adapters/product.repository.adapter';
import { PlanillaRepositoryAdapter } from '../../adapters/planilla.repository.adapter';

@Injectable()
export class InventoryServiceAdapter {
  private inventoryService: InventoryService;

  constructor(
    private readonly productRepositoryAdapter: ProductRepositoryAdapter,
    private readonly planillaRepositoryAdapter: PlanillaRepositoryAdapter,
  ) {
    this.inventoryService = new InventoryService(
      this.productRepositoryAdapter,
      this.planillaRepositoryAdapter,
    );
  }

  // Product methods
  async createProduct(createProductDto: any): Promise<any> {
    return await this.inventoryService.createProduct(createProductDto);
  }

  async findAllProducts(search?: string): Promise<any[]> {
    return await this.inventoryService.findAllProducts(search);
  }

  async findProductById(id: string): Promise<any> {
    return await this.inventoryService.findProductById(id);
  }

  // Planilla methods
  async createPlanilla(createPlanillaDto: any): Promise<any> {
    return await this.inventoryService.createPlanilla(createPlanillaDto);
  }

  async findAllPlanillas(): Promise<any[]> {
    return await this.inventoryService.findAllPlanillas();
  }

  async findPlanillaById(id: string): Promise<any> {
    return await this.inventoryService.findPlanillaById(id);
  }

  async updatePlanillaStatus(id: string, status: string): Promise<any> {
    return await this.inventoryService.updatePlanillaStatus(id, status);
  }
}
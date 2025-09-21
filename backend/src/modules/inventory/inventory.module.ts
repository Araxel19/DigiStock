import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryServiceAdapter } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { Product, Planilla } from 'digistock-business-logic';
import { ProductRepositoryAdapter } from '../../adapters/product.repository.adapter';
import { PlanillaRepositoryAdapter } from '../../adapters/planilla.repository.adapter';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Planilla])],
  providers: [InventoryServiceAdapter, ProductRepositoryAdapter, PlanillaRepositoryAdapter],
  controllers: [InventoryController],
  exports: [InventoryServiceAdapter],
})
export class InventoryModule {}
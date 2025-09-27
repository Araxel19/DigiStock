import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { InventorySnapshot, IInventorySnapshotRepository } from 'digistock-business-logic';

@Injectable()
export class InventorySnapshotRepositoryAdapter implements IInventorySnapshotRepository {
  constructor(
    @InjectRepository(InventorySnapshot)
    private readonly inventorySnapshotRepository: Repository<InventorySnapshot>,
  ) {}

  get manager(): EntityManager {
    return this.inventorySnapshotRepository.manager;
  }

  create(entity: Partial<InventorySnapshot>): InventorySnapshot {
    return this.inventorySnapshotRepository.create(entity);
  }

  async save(entity: InventorySnapshot): Promise<InventorySnapshot> {
    return await this.inventorySnapshotRepository.save(entity);
  }

  async find(options?: any): Promise<InventorySnapshot[]> {
    return await this.inventorySnapshotRepository.find(options);
  }

  async findOne(options: any): Promise<InventorySnapshot | null> {
    return await this.inventorySnapshotRepository.findOne(options);
  }

  async update(criteria: any, partialEntity: any): Promise<any> {
    return await this.inventorySnapshotRepository.update(criteria, partialEntity);
  }

  async delete(criteria: any): Promise<any> {
    return await this.inventorySnapshotRepository.delete(criteria);
  }

  async softDelete(criteria: any): Promise<any> {
    return await this.inventorySnapshotRepository.softDelete(criteria);
  }
}

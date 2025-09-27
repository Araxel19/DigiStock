import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Location, ILocationRepository } from 'digistock-business-logic';

@Injectable()
export class LocationRepositoryAdapter implements ILocationRepository {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  get manager(): EntityManager {
    return this.locationRepository.manager;
  }

  create(entity: Partial<Location>): Location {
    return this.locationRepository.create(entity);
  }

  async save(entity: Location): Promise<Location> {
    return await this.locationRepository.save(entity);
  }

  async find(options?: any): Promise<Location[]> {
    return await this.locationRepository.find(options);
  }

  async findOne(options: any): Promise<Location | null> {
    return await this.locationRepository.findOne(options);
  }

  async update(criteria: any, partialEntity: any): Promise<any> {
    return await this.locationRepository.update(criteria, partialEntity);
  }

  async delete(criteria: any): Promise<any> {
    return await this.locationRepository.delete(criteria);
  }
}

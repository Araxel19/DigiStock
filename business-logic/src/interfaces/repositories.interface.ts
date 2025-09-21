import { User } from '../entities/user.entity';
import { Product } from '../entities/product.entity';
import { Planilla } from '../entities/planilla.entity';

export interface IUserRepository {
  create(entity: Partial<User>): User;
  save(entity: User): Promise<User>;
  find(options?: any): Promise<User[]>;
  findOne(options: any): Promise<User | null>;
  update(criteria: any, partialEntity: any): Promise<any>;
  delete(criteria: any): Promise<any>;
}

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

export interface IJwtService {
  sign(payload: any): string;
}

export interface IN8nConfig {
  getWebhookUrl(workflowId: string): string;
  getBaseUrl(): string;
}

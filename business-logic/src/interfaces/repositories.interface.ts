import {
  Organization,
  User,
  Role,
  UserRole,
  Category,
  Location,
  Product,
  Planilla,
  PlanillaItem,
  InventorySnapshot,
  Report,
  Alert,
  AuditLog,
} from '../entities';
import { EntityManager } from 'typeorm';

export interface IRepository<T> {
  manager: EntityManager;
  create(entity: Partial<T>): T;
  save(entity: T): Promise<T>;
  find(options?: any): Promise<T[]>;
  findOne(options: any): Promise<T | null>;
  update(criteria: any, partialEntity: Partial<T>): Promise<any>;
  delete(criteria: any): Promise<any>;
  softDelete(criteria: any): Promise<any>;
}

export interface IOrganizationRepository extends IRepository<Organization> {
  softDelete(criteria: any): Promise<any>;
}
export interface IUserRepository extends IRepository<User> {}
export interface IRoleRepository extends IRepository<Role> {}
export interface IUserRoleRepository extends IRepository<UserRole> {}
export interface ICategoryRepository extends IRepository<Category> {}
export interface ILocationRepository extends IRepository<Location> {}
export interface IProductRepository extends IRepository<Product> {}
export interface IPlanillaRepository extends IRepository<Planilla> {}
export interface IPlanillaItemRepository extends IRepository<PlanillaItem> {}
export interface IInventorySnapshotRepository extends IRepository<InventorySnapshot> {}
export interface IReportRepository extends IRepository<Report> {}
export interface IAlertRepository extends IRepository<Alert> {}
export interface IAuditLogRepository extends IRepository<AuditLog> {}


export interface IJwtService {
  sign(payload: any): string;
}

export interface IN8nConfig {
  getWebhookUrl(workflowId: string): string;
  getBaseUrl(): string;
}
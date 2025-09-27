// === EXPORTACIÓN DE ENTIDADES ===
// Exporta las entidades antiguas y TODAS las nuevas
export { User } from './entities/user.entity';
export { Product } from './entities/product.entity';
export { Planilla } from './entities/planilla.entity';
export { Organization } from './entities/organization.entity';
export { Role } from './entities/role.entity';
export { UserRole } from './entities/user-role.entity';
export { Category } from './entities/category.entity';
export { Location } from './entities/location.entity';
export { PlanillaItem } from './entities/planilla-item.entity';
export { InventorySnapshot } from './entities/inventory-snapshot.entity';
export { Report } from './entities/report.entity';
export { Alert } from './entities/alert.entity';
export { AuditLog } from './entities/audit-log.entity';


// === EXPORTACIÓN DE DTOS ===
// (Esto ya lo tenías bien)
export * from './dto';


// === EXPORTACIÓN DE SERVICIOS ===
// (Esto ya lo tenías bien)
export { UserService } from './services/user.service';
export { InventoryService } from './services/inventory.service';
export { AuthService } from './services/auth.service';
export { OcrService } from './services/ocr.service';


// === EXPORTACIÓN DE INTERFACES ===
// Exporta todas las interfaces desde el único archivo donde están definidas
export {
  IUserRepository,
  IProductRepository,
  IPlanillaRepository,
  IOrganizationRepository,
  IRoleRepository,
  IUserRoleRepository,
  ICategoryRepository,
  ILocationRepository,
  IPlanillaItemRepository,
  IInventorySnapshotRepository,
  IReportRepository,
  IAlertRepository,
  IAuditLogRepository,
  IJwtService,
  IN8nConfig,
} from './interfaces/repositories.interface';
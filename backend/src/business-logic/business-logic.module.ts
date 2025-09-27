// backend/src/business-logic/business-logic.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Alert,
  AuditLog,
  AuthService,
  Category,
  InventoryService,
  InventorySnapshot,
  Location,
  OcrService,
  Organization,
  Planilla,
  PlanillaItem,
  Product,
  Report,
  Role,
  User,
  UserService,
  UserRole,
} from 'digistock-business-logic';
import { JwtServiceAdapter } from '../adapters/jwt.service.adapter';
import { ProductRepositoryAdapter } from '../adapters/product.repository.adapter';
import { PlanillaRepositoryAdapter } from '../adapters/planilla.repository.adapter';
import { PlanillaItemRepositoryAdapter } from '../adapters/planilla-item.repository.adapter';
import { CategoryRepositoryAdapter } from '../adapters/category.repository.adapter';
import { LocationRepositoryAdapter } from '../adapters/location.repository.adapter';
import { UserRepositoryAdapter } from '../adapters/user.repository.adapter';
import { RoleRepositoryAdapter } from '../adapters/role.repository.adapter';
import { UserRoleRepositoryAdapter } from '../adapters/user-role.repository.adapter';
import { OrganizationRepositoryAdapter } from '../adapters/organization.repository.adapter';
import { AlertRepositoryAdapter } from '../adapters/alert.repository.adapter';
import { AuditLogRepositoryAdapter } from '../adapters/audit-log.repository.adapter';
import { InventorySnapshotRepositoryAdapter } from '../adapters/inventory-snapshot.repository.adapter';
import { ReportRepositoryAdapter } from '../adapters/report.repository.adapter';
import { N8nConfigAdapter } from '../adapters/n8n.config.adapter';
import { N8nConfig } from '../config/n8n.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Planilla,
      PlanillaItem,
      Category,
      Location,
      User,
      Role,
      UserRole,
      Organization,
      Alert,
      AuditLog,
      InventorySnapshot,
      Report,
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '7d',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    InventoryService,
    OcrService,
    UserService,
    JwtServiceAdapter,
    ProductRepositoryAdapter,
    PlanillaRepositoryAdapter,
    PlanillaItemRepositoryAdapter,
    CategoryRepositoryAdapter,
    LocationRepositoryAdapter,
    UserRepositoryAdapter,
    RoleRepositoryAdapter,
    UserRoleRepositoryAdapter,
    OrganizationRepositoryAdapter,
    AlertRepositoryAdapter,
    AuditLogRepositoryAdapter,
    InventorySnapshotRepositoryAdapter,
    ReportRepositoryAdapter,
    N8nConfigAdapter,
    N8nConfig,
    {
      provide: 'IJwtService',
      useClass: JwtServiceAdapter,
    },
    {
      provide: 'IProductRepository',
      useClass: ProductRepositoryAdapter,
    },
    {
      provide: 'IPlanillaRepository',
      useClass: PlanillaRepositoryAdapter,
    },
    {
      provide: 'IPlanillaItemRepository',
      useClass: PlanillaItemRepositoryAdapter,
    },
    {
      provide: 'ICategoryRepository',
      useClass: CategoryRepositoryAdapter,
    },
    {
      provide: 'ILocationRepository',
      useClass: LocationRepositoryAdapter,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepositoryAdapter,
    },
    {
      provide: 'IRoleRepository',
      useClass: RoleRepositoryAdapter,
    },
    {
      provide: 'IUserRoleRepository',
      useClass: UserRoleRepositoryAdapter,
    },
    {
      provide: 'IOrganizationRepository',
      useClass: OrganizationRepositoryAdapter,
    },
    {
      provide: 'IAlertRepository',
      useClass: AlertRepositoryAdapter,
    },
    {
      provide: 'IAuditLogRepository',
      useClass: AuditLogRepositoryAdapter,
    },
    {
      provide: 'IInventorySnapshotRepository',
      useClass: InventorySnapshotRepositoryAdapter,
    },
    {
      provide: 'IReportRepository',
      useClass: ReportRepositoryAdapter,
    },
    {
      provide: 'IN8nConfig',
      useClass: N8nConfigAdapter,
    },
  ],
  exports: [
    AuthService,
    InventoryService,
    OcrService,
    UserService,
    JwtModule,
    JwtServiceAdapter,
    'IProductRepository',
    'IPlanillaRepository',
    'IPlanillaItemRepository',
    'ICategoryRepository',
    'ILocationRepository',
    'IUserRepository',
    'IRoleRepository',
    'IUserRoleRepository',
    'IOrganizationRepository',
    'IAlertRepository',
    'IAuditLogRepository',
    'IInventorySnapshotRepository',
    'IReportRepository',
    'IN8nConfig',
    'IJwtService',
  ],
})
export class BusinessLogicModule {}
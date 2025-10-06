"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessLogicModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const digistock_business_logic_1 = require("digistock-business-logic");
const jwt_service_adapter_1 = require("../adapters/jwt.service.adapter");
const product_repository_adapter_1 = require("../adapters/product.repository.adapter");
const planilla_repository_adapter_1 = require("../adapters/planilla.repository.adapter");
const planilla_item_repository_adapter_1 = require("../adapters/planilla-item.repository.adapter");
const category_repository_adapter_1 = require("../adapters/category.repository.adapter");
const location_repository_adapter_1 = require("../adapters/location.repository.adapter");
const user_repository_adapter_1 = require("../adapters/user.repository.adapter");
const role_repository_adapter_1 = require("../adapters/role.repository.adapter");
const user_role_repository_adapter_1 = require("../adapters/user-role.repository.adapter");
const organization_repository_adapter_1 = require("../adapters/organization.repository.adapter");
const alert_repository_adapter_1 = require("../adapters/alert.repository.adapter");
const audit_log_repository_adapter_1 = require("../adapters/audit-log.repository.adapter");
const inventory_snapshot_repository_adapter_1 = require("../adapters/inventory-snapshot.repository.adapter");
const report_repository_adapter_1 = require("../adapters/report.repository.adapter");
const n8n_config_adapter_1 = require("../adapters/n8n.config.adapter");
const n8n_config_1 = require("../config/n8n.config");
let BusinessLogicModule = class BusinessLogicModule {
};
exports.BusinessLogicModule = BusinessLogicModule;
exports.BusinessLogicModule = BusinessLogicModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                digistock_business_logic_1.Product,
                digistock_business_logic_1.Planilla,
                digistock_business_logic_1.PlanillaItem,
                digistock_business_logic_1.Category,
                digistock_business_logic_1.Location,
                digistock_business_logic_1.User,
                digistock_business_logic_1.Role,
                digistock_business_logic_1.UserRole,
                digistock_business_logic_1.Organization,
                digistock_business_logic_1.Alert,
                digistock_business_logic_1.AuditLog,
                digistock_business_logic_1.InventorySnapshot,
                digistock_business_logic_1.Report,
            ]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: configService.get('JWT_EXPIRES_IN') || '7d',
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [
            digistock_business_logic_1.AuthService,
            digistock_business_logic_1.InventoryService,
            digistock_business_logic_1.OcrService,
            digistock_business_logic_1.UserService,
            jwt_service_adapter_1.JwtServiceAdapter,
            product_repository_adapter_1.ProductRepositoryAdapter,
            planilla_repository_adapter_1.PlanillaRepositoryAdapter,
            planilla_item_repository_adapter_1.PlanillaItemRepositoryAdapter,
            category_repository_adapter_1.CategoryRepositoryAdapter,
            location_repository_adapter_1.LocationRepositoryAdapter,
            user_repository_adapter_1.UserRepositoryAdapter,
            role_repository_adapter_1.RoleRepositoryAdapter,
            user_role_repository_adapter_1.UserRoleRepositoryAdapter,
            organization_repository_adapter_1.OrganizationRepositoryAdapter,
            alert_repository_adapter_1.AlertRepositoryAdapter,
            audit_log_repository_adapter_1.AuditLogRepositoryAdapter,
            inventory_snapshot_repository_adapter_1.InventorySnapshotRepositoryAdapter,
            report_repository_adapter_1.ReportRepositoryAdapter,
            n8n_config_adapter_1.N8nConfigAdapter,
            n8n_config_1.N8nConfig,
            {
                provide: 'IJwtService',
                useClass: jwt_service_adapter_1.JwtServiceAdapter,
            },
            {
                provide: 'IProductRepository',
                useClass: product_repository_adapter_1.ProductRepositoryAdapter,
            },
            {
                provide: 'IPlanillaRepository',
                useClass: planilla_repository_adapter_1.PlanillaRepositoryAdapter,
            },
            {
                provide: 'IPlanillaItemRepository',
                useClass: planilla_item_repository_adapter_1.PlanillaItemRepositoryAdapter,
            },
            {
                provide: 'ICategoryRepository',
                useClass: category_repository_adapter_1.CategoryRepositoryAdapter,
            },
            {
                provide: 'ILocationRepository',
                useClass: location_repository_adapter_1.LocationRepositoryAdapter,
            },
            {
                provide: 'IUserRepository',
                useClass: user_repository_adapter_1.UserRepositoryAdapter,
            },
            {
                provide: 'IRoleRepository',
                useClass: role_repository_adapter_1.RoleRepositoryAdapter,
            },
            {
                provide: 'IUserRoleRepository',
                useClass: user_role_repository_adapter_1.UserRoleRepositoryAdapter,
            },
            {
                provide: 'IOrganizationRepository',
                useClass: organization_repository_adapter_1.OrganizationRepositoryAdapter,
            },
            {
                provide: 'IAlertRepository',
                useClass: alert_repository_adapter_1.AlertRepositoryAdapter,
            },
            {
                provide: 'IAuditLogRepository',
                useClass: audit_log_repository_adapter_1.AuditLogRepositoryAdapter,
            },
            {
                provide: 'IInventorySnapshotRepository',
                useClass: inventory_snapshot_repository_adapter_1.InventorySnapshotRepositoryAdapter,
            },
            {
                provide: 'IReportRepository',
                useClass: report_repository_adapter_1.ReportRepositoryAdapter,
            },
            {
                provide: 'IN8nConfig',
                useClass: n8n_config_adapter_1.N8nConfigAdapter,
            },
        ],
        exports: [
            digistock_business_logic_1.AuthService,
            digistock_business_logic_1.InventoryService,
            digistock_business_logic_1.OcrService,
            digistock_business_logic_1.UserService,
            jwt_1.JwtModule,
            jwt_service_adapter_1.JwtServiceAdapter,
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
], BusinessLogicModule);
//# sourceMappingURL=business-logic.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const inventory_module_1 = require("./modules/inventory/inventory.module");
const locations_module_1 = require("./modules/locations/locations.module");
const ocr_module_1 = require("./modules/ocr/ocr.module");
const database_config_1 = require("./config/database.config");
const organization_module_1 = require("./modules/organization/organization.module");
const roles_module_1 = require("./modules/roles/roles.module");
const business_logic_module_1 = require("./business-logic/business-logic.module");
const progress_module_1 = require("./modules/progress/progress.module");
const files_module_1 = require("./modules/files/files.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const core_1 = require("@nestjs/core");
const metrics_interceptor_1 = require("./common/interceptors/metrics.interceptor");
const nestjs_prometheus_1 = require("@willsoto/nestjs-prometheus");
const metrics_module_1 = require("./metrics/metrics.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', '..', 'uploads'),
                serveRoot: '/files',
                serveStaticOptions: {
                    setHeaders: (res, path, stat) => {
                        res.set('Access-Control-Allow-Origin', '*');
                    },
                },
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useClass: database_config_1.DatabaseConfig,
            }),
            business_logic_module_1.BusinessLogicModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            inventory_module_1.InventoryModule,
            locations_module_1.LocationsModule,
            ocr_module_1.OcrModule,
            organization_module_1.OrganizationModule,
            roles_module_1.RolesModule,
            progress_module_1.ProgressModule,
            files_module_1.FilesModule,
            nestjs_prometheus_1.PrometheusModule.register({
                defaultMetrics: {
                    enabled: true,
                },
            }),
            metrics_module_1.MetricsModule,
        ],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: metrics_interceptor_1.MetricsInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
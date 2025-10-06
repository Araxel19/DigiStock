"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfig = void 0;
const common_1 = require("@nestjs/common");
const digistock_business_logic_1 = require("digistock-business-logic");
let DatabaseConfig = class DatabaseConfig {
    createTypeOrmOptions() {
        return {
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT) || 5432,
            username: process.env.DB_USERNAME || 'digistock_user',
            password: process.env.DB_PASSWORD || 'digistock_password',
            database: process.env.DB_NAME || 'digistock_db',
            entities: [
                digistock_business_logic_1.Alert,
                digistock_business_logic_1.AuditLog,
                digistock_business_logic_1.Category,
                digistock_business_logic_1.InventorySnapshot,
                digistock_business_logic_1.Location,
                digistock_business_logic_1.Organization,
                digistock_business_logic_1.Planilla,
                digistock_business_logic_1.PlanillaItem,
                digistock_business_logic_1.Product,
                digistock_business_logic_1.Report,
                digistock_business_logic_1.Role,
                digistock_business_logic_1.User,
                digistock_business_logic_1.UserRole,
            ],
            synchronize: process.env.NODE_ENV === 'development',
            logging: process.env.NODE_ENV === 'development',
            ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
        };
    }
};
exports.DatabaseConfig = DatabaseConfig;
exports.DatabaseConfig = DatabaseConfig = __decorate([
    (0, common_1.Injectable)()
], DatabaseConfig);
//# sourceMappingURL=database.config.js.map
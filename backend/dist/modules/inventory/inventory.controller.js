"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const inventory_service_1 = require("./inventory.service");
const dto_1 = require("./dto");
const digistock_business_logic_1 = require("digistock-business-logic");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const progress_gateway_1 = require("../progress/progress.gateway");
let InventoryController = class InventoryController {
    constructor(inventoryService, progressGateway) {
        this.inventoryService = inventoryService;
        this.progressGateway = progressGateway;
    }
    getDashboardStats(req) {
        return this.inventoryService.getDashboardStats(req.user.organizationId);
    }
    createProduct(createProductDto, req) {
        createProductDto.organizationId = req.user.organizationId;
        return this.inventoryService.createProduct(createProductDto);
    }
    findAllProducts(search, req) {
        return this.inventoryService.findAllProducts(req.user.organizationId, search);
    }
    findProduct(id) {
        return this.inventoryService.findProductById(id);
    }
    updateProduct(id, updateProductDto, req) {
        return this.inventoryService.updateProduct(id, { ...updateProductDto, organizationId: req.user.organizationId });
    }
    removeProduct(id) {
        return this.inventoryService.removeProduct(id);
    }
    createPlanilla(createPlanillaDto, req) {
        createPlanillaDto.organizationId = req.user.organizationId;
        createPlanillaDto.userId = req.user.userId;
        return this.inventoryService.createPlanilla(createPlanillaDto);
    }
    findAllPlanillas(req) {
        const user = req.user;
        if (user.roles.includes('data_entry') && !user.roles.includes('supervisor') && !user.roles.includes('org_admin')) {
            return this.inventoryService.findPlanillasByUserId(user.userId);
        }
        return this.inventoryService.findAllPlanillas(req.user.organizationId);
    }
    findPlanilla(id) {
        return this.inventoryService.findPlanillaById(id);
    }
    updatePlanilla(id, updatePlanillaDto) {
        return this.inventoryService.updatePlanilla(id, updatePlanillaDto);
    }
    removePlanilla(id) {
        return this.inventoryService.removeProduct(id);
    }
    async confirmPlanillaData(id, validatedPlanillaDto) {
        return this.inventoryService.saveValidatedPlanillaItems(id, validatedPlanillaDto);
    }
    async notifyProgress(planillaId, status, message) {
        this.progressGateway.sendProgress(planillaId, status, message);
        return {
            success: true,
            message: 'Progress notification received',
            data: { planillaId, status, message },
        };
    }
};
exports.InventoryController = InventoryController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get inventory stats' }),
    (0, common_1.Get)('stats'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('org_admin', 'supervisor'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "getDashboardStats", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create product' }),
    (0, common_1.Post)('products'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('org_admin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateProductDto, Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "createProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get products' }),
    (0, common_1.Get)('products'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('org_admin', 'supervisor', 'data_entry'),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findAllProducts", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get product by ID' }),
    (0, common_1.Get)('products/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('org_admin', 'supervisor'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update product' }),
    (0, common_1.Put)('products/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('org_admin', 'supervisor', 'data_entry'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateProductDto, Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "updateProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete product' }),
    (0, common_1.Delete)('products/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('org_admin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "removeProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create planilla' }),
    (0, common_1.Post)('planillas'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('org_admin', 'supervisor', 'data_entry'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreatePlanillaDto, Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "createPlanilla", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get planillas' }),
    (0, common_1.Get)('planillas'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('org_admin', 'supervisor', 'data_entry'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findAllPlanillas", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get planilla by ID' }),
    (0, common_1.Get)('planillas/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('org_admin', 'supervisor', 'data_entry'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findPlanilla", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update planilla' }),
    (0, common_1.Put)('planillas/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('org_admin', 'supervisor'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdatePlanillaDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "updatePlanilla", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete planilla' }),
    (0, common_1.Delete)('planillas/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('org_admin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "removePlanilla", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Confirm validated planilla data' }),
    (0, common_1.Post)('planillas/:id/confirmar'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('org_admin', 'supervisor', 'data_entry'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, digistock_business_logic_1.ValidatedPlanillaDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "confirmPlanillaData", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Notify progress of processing' }),
    (0, common_1.Post)('notify-progress'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)('planillaId')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, common_1.Body)('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "notifyProgress", null);
exports.InventoryController = InventoryController = __decorate([
    (0, swagger_1.ApiTags)('Inventory'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('inventory'),
    __metadata("design:paramtypes", [inventory_service_1.InventoryService,
        progress_gateway_1.ProgressGateway])
], InventoryController);
//# sourceMappingURL=inventory.controller.js.map
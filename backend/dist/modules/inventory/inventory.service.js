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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const digistock_business_logic_1 = require("digistock-business-logic");
let InventoryService = class InventoryService {
    constructor(businessInventoryService) {
        this.businessInventoryService = businessInventoryService;
    }
    createProduct(createProductDto) {
        return this.businessInventoryService.createProduct(createProductDto);
    }
    findAllProducts(organizationId, search) {
        return this.businessInventoryService.findAllProducts(organizationId, search);
    }
    findProductById(id) {
        return this.businessInventoryService.findProductById(id);
    }
    updateProduct(id, updateProductDto) {
        return this.businessInventoryService.updateProduct(id, updateProductDto);
    }
    removeProduct(id) {
        return this.businessInventoryService.removeProduct(id);
    }
    createCategory(createCategoryDto) {
        return this.businessInventoryService.createCategory(createCategoryDto);
    }
    findAllCategories(organizationId) {
        return this.businessInventoryService.findAllCategories(organizationId);
    }
    findCategoryById(id) {
        return this.businessInventoryService.findCategoryById(id);
    }
    updateCategory(id, updateCategoryDto) {
        return this.businessInventoryService.updateCategory(id, updateCategoryDto);
    }
    removeCategory(id) {
        return this.businessInventoryService.removeCategory(id);
    }
    createPlanilla(createPlanillaDto) {
        return this.businessInventoryService.createPlanilla(createPlanillaDto);
    }
    findAllPlanillas(organizationId) {
        return this.businessInventoryService.findAllPlanillas(organizationId);
    }
    findPlanillasByUserId(userId) {
        return this.businessInventoryService.findPlanillasByUserId(userId);
    }
    findPlanillaById(id) {
        return this.businessInventoryService.findPlanillaById(id);
    }
    updatePlanilla(id, updatePlanillaDto) {
        return this.businessInventoryService.updatePlanilla(id, updatePlanillaDto);
    }
    removePlanilla(id) {
        return this.businessInventoryService.removePlanilla(id);
    }
    saveValidatedPlanillaItems(id, validatedPlanillaDto) {
        return this.businessInventoryService.saveValidatedPlanillaItems(id, validatedPlanillaDto);
    }
    getDashboardStats(organizationId) {
        return this.businessInventoryService.getDashboardStats(organizationId);
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [digistock_business_logic_1.InventoryService])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map
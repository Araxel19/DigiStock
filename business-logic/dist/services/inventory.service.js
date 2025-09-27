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
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let InventoryService = class InventoryService {
    constructor(productRepository, planillaRepository, planillaItemRepository, categoryRepository, locationRepository) {
        this.productRepository = productRepository;
        this.planillaRepository = planillaRepository;
        this.planillaItemRepository = planillaItemRepository;
        this.categoryRepository = categoryRepository;
        this.locationRepository = locationRepository;
    }
    async createProduct(createProductDto) {
        const product = this.productRepository.create(createProductDto);
        return this.productRepository.save(product);
    }
    async findAllProducts(organizationId, search) {
        const where = search
            ? [
                { name: (0, typeorm_1.Like)(`%${search}%`), organizationId },
                { code: (0, typeorm_1.Like)(`%${search}%`), organizationId },
            ]
            : { organizationId };
        return this.productRepository.find({ where, relations: ['category', 'location'] });
    }
    async findProductById(id) {
        const product = await this.productRepository.findOne({ where: { id }, relations: ['category', 'location'] });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return product;
    }
    async updateProduct(id, updateProductDto) {
        await this.productRepository.update(id, updateProductDto);
        return this.findProductById(id);
    }
    async removeProduct(id) {
        const result = await this.productRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Product not found');
        }
    }
    async createPlanilla(createPlanillaDto) {
        const planilla = this.planillaRepository.create(createPlanillaDto);
        return this.planillaRepository.save(planilla);
    }
    async findAllPlanillas(organizationId) {
        return this.planillaRepository.find({
            where: { organizationId },
            order: { createdAt: 'DESC' },
            relations: ['user'],
        });
    }
    async findPlanillaById(id) {
        const planilla = await this.planillaRepository.findOne({
            where: { id },
            relations: ['user', 'organization', 'items', 'items.correctedProduct'],
        });
        if (!planilla) {
            throw new common_1.NotFoundException('Planilla not found');
        }
        return planilla;
    }
    async updatePlanilla(id, updatePlanillaDto) {
        await this.planillaRepository.update(id, updatePlanillaDto);
        return this.findPlanillaById(id);
    }
    async removePlanilla(id) {
        const result = await this.planillaRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Planilla not found');
        }
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IProductRepository')),
    __param(1, (0, common_1.Inject)('IPlanillaRepository')),
    __param(2, (0, common_1.Inject)('IPlanillaItemRepository')),
    __param(3, (0, common_1.Inject)('ICategoryRepository')),
    __param(4, (0, common_1.Inject)('ILocationRepository')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map
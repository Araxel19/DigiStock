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
const entities_1 = require("../entities");
const typeorm_1 = require("typeorm");
let InventoryService = class InventoryService {
    constructor(productRepository, planillaRepository, planillaItemRepository, categoryRepository, locationRepository, inventorySnapshotRepository) {
        this.productRepository = productRepository;
        this.planillaRepository = planillaRepository;
        this.planillaItemRepository = planillaItemRepository;
        this.categoryRepository = categoryRepository;
        this.locationRepository = locationRepository;
        this.inventorySnapshotRepository = inventorySnapshotRepository;
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
        const product = await this.findProductById(id);
        if (updateProductDto.organizationId && product.organizationId !== updateProductDto.organizationId) {
            throw new common_1.UnauthorizedException('You are not allowed to update this product.');
        }
        await this.productRepository.update(id, updateProductDto);
        return this.findProductById(id);
    }
    async removeProduct(id) {
        const result = await this.productRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Product not found');
        }
    }
    async createCategory(createCategoryDto) {
        const category = this.categoryRepository.create(createCategoryDto);
        return this.categoryRepository.save(category);
    }
    async findAllCategories(organizationId) {
        return this.categoryRepository.find({ where: { organizationId } });
    }
    async findCategoryById(id) {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        return category;
    }
    async updateCategory(id, updateCategoryDto) {
        await this.categoryRepository.update(id, updateCategoryDto);
        return this.findCategoryById(id);
    }
    async removeCategory(id) {
        const result = await this.categoryRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Category not found');
        }
    }
    async createPlanilla(createPlanillaDto) {
        const planilla = this.planillaRepository.create(createPlanillaDto);
        return this.planillaRepository.save(planilla);
    }
    async findAllPlanillas(organizationId) {
        const planillas = await this.planillaRepository.find({
            where: { organizationId },
            order: { uploadedAt: 'DESC' },
            relations: ['user'],
        });
        return planillas.map(p => ({ ...p, user: p.user ? { id: p.user.id, firstName: p.user.firstName, lastName: p.user.lastName } : null }));
    }
    async findPlanillasByUserId(userId) {
        return this.planillaRepository.find({
            where: { userId },
            order: { uploadedAt: 'DESC' },
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
    async saveValidatedPlanillaItems(planillaId, validatedPlanillaDto) {
        const planilla = await this.planillaRepository.findOne({ where: { id: planillaId } });
        if (!planilla) {
            throw new common_1.NotFoundException(`Planilla with ID ${planillaId} not found.`);
        }
        const { organizationId } = planilla;
        return this.productRepository.manager.transaction(async (transactionalEntityManager) => {
            const productRepo = transactionalEntityManager.getRepository(entities_1.Product);
            const categoryRepo = transactionalEntityManager.getRepository(entities_1.Category);
            const locationRepo = transactionalEntityManager.getRepository(entities_1.Location);
            const planillaItemRepo = transactionalEntityManager.getRepository(entities_1.PlanillaItem);
            const planillaRepo = transactionalEntityManager.getRepository(entities_1.Planilla);
            await planillaItemRepo.delete({ planillaId });
            for (const item of validatedPlanillaDto.items) {
                const productCode = item['codigo'];
                const productName = item['nombre_del_producto'];
                const productDescription = item['descripcion'];
                const categoryName = item['categoria'];
                const locationName = item['ubicacion'];
                const quantity = Number(item['cantidad'] || 0);
                const price = Number(item['precio'] || 0);
                let matchStatus = 'unmatched';
                let category = null;
                if (categoryName && categoryName !== 'Sin categoría') {
                    category = await categoryRepo.createQueryBuilder("category")
                        .where("LOWER(category.name) = LOWER(:name)", { name: categoryName })
                        .andWhere("category.organizationId = :organizationId", { organizationId })
                        .getOne();
                    if (!category) {
                        category = await categoryRepo.save({ name: categoryName, organizationId });
                    }
                }
                let location = null;
                if (locationName && locationName !== 'No asignada') {
                    location = await locationRepo.createQueryBuilder("location")
                        .where("LOWER(location.name) = LOWER(:name)", { name: locationName })
                        .andWhere("location.organizationId = :organizationId", { organizationId })
                        .getOne();
                    if (!location) {
                        location = await locationRepo.save({ name: locationName, organizationId });
                    }
                }
                let product = null;
                if (productCode && productCode !== '---') {
                    product = await productRepo.findOne({ where: { code: productCode, organizationId } });
                }
                if (product) {
                    product.cantidad = (product.cantidad || 0) + quantity;
                    product.price = price;
                    product.description = productDescription;
                    product.categoryId = category ? category.id : product.categoryId;
                    product.locationId = location ? location.id : product.locationId;
                    await productRepo.save(product);
                    matchStatus = 'matched';
                }
                else if (productCode && productCode !== '---' && productName && productName !== 'Sin nombre') {
                    const newProductData = {
                        organizationId,
                        code: productCode,
                        name: productName,
                        description: productDescription,
                        cantidad: quantity,
                        price: price,
                        categoryId: category ? category.id : null,
                        locationId: location ? location.id : null,
                    };
                    product = await productRepo.save(newProductData);
                    matchStatus = 'manual_override';
                }
                if (product) {
                    const newPlanillaItemData = {
                        planillaId,
                        detectedCode: productCode,
                        detectedName: productName,
                        detectedQuantity: quantity,
                        correctedProductId: product.id,
                        correctedQuantity: quantity,
                        matchStatus: matchStatus,
                    };
                    await planillaItemRepo.save(newPlanillaItemData);
                }
            }
            await planillaRepo.update(planillaId, {
                status: 'procesado',
                processedAt: new Date(),
                validatedAt: new Date(),
            });
            return this.findPlanillaById(planillaId);
        });
    }
    async getDashboardStats(organizationId) {
        const totalProducts = (await this.productRepository.find({ where: { organizationId } })).length;
        const processedPlanillasCount = (await this.planillaRepository.find({
            where: { organizationId, status: 'procesado' },
        })).length;
        const pendingPlanillasCount = (await this.planillaRepository.find({
            where: { organizationId, status: 'validacion_pendiente' },
        })).length;
        const processedPlanillas = await this.planillaRepository.find({
            where: { organizationId, status: 'procesado' },
            relations: ['items'],
        });
        let ocrSuccessRate = 0;
        if (processedPlanillas.length > 0) {
            const successRates = processedPlanillas.map(p => {
                if (p.items.length === 0)
                    return 0;
                const matchedItems = p.items.filter(i => i.matchStatus === 'matched').length;
                return (matchedItems / p.items.length) * 100;
            });
            ocrSuccessRate = successRates.reduce((acc, rate) => acc + rate, 0) / successRates.length;
        }
        const recentPlanillas = await this.planillaRepository.find({
            where: { organizationId, status: 'procesado' },
            order: { processedAt: 'DESC' },
            take: 2,
        });
        const recentProducts = await this.productRepository.find({
            where: { organizationId },
            order: { createdAt: 'DESC' },
            take: 3,
        });
        return {
            totalProducts,
            processedPlanillas: processedPlanillasCount,
            pendingPlanillas: pendingPlanillasCount,
            ocrSuccessRate: Math.round(ocrSuccessRate),
            recentActivity: {
                planillas: recentPlanillas,
                products: recentProducts,
            },
        };
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
    __param(5, (0, common_1.Inject)('IInventorySnapshotRepository')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map
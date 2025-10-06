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
exports.ProductRepositoryAdapter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const digistock_business_logic_1 = require("digistock-business-logic");
let ProductRepositoryAdapter = class ProductRepositoryAdapter {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    get manager() {
        return this.productRepository.manager;
    }
    create(entity) {
        return this.productRepository.create(entity);
    }
    async save(entity) {
        return await this.productRepository.save(entity);
    }
    async find(options) {
        return await this.productRepository.find(options);
    }
    async findOne(options) {
        return await this.productRepository.findOne(options);
    }
    async update(criteria, partialEntity) {
        return await this.productRepository.update(criteria, partialEntity);
    }
    async delete(criteria) {
        return await this.productRepository.delete(criteria);
    }
    async softDelete(criteria) {
        return await this.productRepository.softDelete(criteria);
    }
};
exports.ProductRepositoryAdapter = ProductRepositoryAdapter;
exports.ProductRepositoryAdapter = ProductRepositoryAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(digistock_business_logic_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductRepositoryAdapter);
//# sourceMappingURL=product.repository.adapter.js.map
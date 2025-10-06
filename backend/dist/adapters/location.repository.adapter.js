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
exports.LocationRepositoryAdapter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const digistock_business_logic_1 = require("digistock-business-logic");
let LocationRepositoryAdapter = class LocationRepositoryAdapter {
    constructor(locationRepository) {
        this.locationRepository = locationRepository;
    }
    get manager() {
        return this.locationRepository.manager;
    }
    create(entity) {
        return this.locationRepository.create(entity);
    }
    async save(entity) {
        return await this.locationRepository.save(entity);
    }
    async find(options) {
        return await this.locationRepository.find(options);
    }
    async findOne(options) {
        return await this.locationRepository.findOne(options);
    }
    async update(criteria, partialEntity) {
        return await this.locationRepository.update(criteria, partialEntity);
    }
    async delete(criteria) {
        return await this.locationRepository.delete(criteria);
    }
    async softDelete(criteria) {
        return await this.locationRepository.softDelete(criteria);
    }
};
exports.LocationRepositoryAdapter = LocationRepositoryAdapter;
exports.LocationRepositoryAdapter = LocationRepositoryAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(digistock_business_logic_1.Location)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LocationRepositoryAdapter);
//# sourceMappingURL=location.repository.adapter.js.map
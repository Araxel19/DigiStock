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
exports.LocationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const digistock_business_logic_1 = require("digistock-business-logic");
let LocationsService = class LocationsService {
    constructor(locationRepository) {
        this.locationRepository = locationRepository;
    }
    async create(createLocationDto) {
        const location = this.locationRepository.create(createLocationDto);
        return this.locationRepository.save(location);
    }
    async findAll(organizationId) {
        return this.locationRepository.find({ where: { organizationId } });
    }
    async findOne(id) {
        const location = await this.locationRepository.findOne({ where: { id } });
        if (!location) {
            throw new common_1.NotFoundException(`Location with ID "${id}" not found`);
        }
        return location;
    }
    async update(id, updateLocationDto) {
        const location = await this.findOne(id);
        this.locationRepository.merge(location, updateLocationDto);
        return this.locationRepository.save(location);
    }
    async remove(id) {
        const result = await this.locationRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Location with ID "${id}" not found`);
        }
    }
};
exports.LocationsService = LocationsService;
exports.LocationsService = LocationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(digistock_business_logic_1.Location)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LocationsService);
//# sourceMappingURL=locations.service.js.map
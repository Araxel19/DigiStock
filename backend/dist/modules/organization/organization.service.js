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
exports.OrganizationService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
let OrganizationService = class OrganizationService {
    constructor(organizationRepository) {
        this.organizationRepository = organizationRepository;
    }
    transformOrganization(org) {
        if (!org)
            return null;
        let details = {};
        try {
            if (typeof org.details === 'string') {
                details = JSON.parse(org.details);
            }
            else if (typeof org.details === 'object' && org.details !== null) {
                details = org.details;
            }
        }
        catch (e) {
            console.error('Failed to parse organization details', e);
        }
        return {
            ...org,
            details,
            isActive: org.deletedAt === null,
            memberCount: org.users?.length || 0,
        };
    }
    create(createOrganizationDto) {
        const organization = this.organizationRepository.create(createOrganizationDto);
        return this.organizationRepository.save(organization);
    }
    async findAll() {
        const orgs = await this.organizationRepository.find({ relations: ['users'] });
        return orgs.map(org => this.transformOrganization(org));
    }
    async findOne(id) {
        const org = await this.organizationRepository.findOne({ where: { id }, relations: ['users'] });
        return this.transformOrganization(org);
    }
    update(id, updateOrganizationDto) {
        return this.organizationRepository.update({ id }, updateOrganizationDto);
    }
    remove(id) {
        return this.organizationRepository.softDelete({ id });
    }
};
exports.OrganizationService = OrganizationService;
exports.OrganizationService = OrganizationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_2.Inject)('IOrganizationRepository')),
    __metadata("design:paramtypes", [Object])
], OrganizationService);
//# sourceMappingURL=organization.service.js.map
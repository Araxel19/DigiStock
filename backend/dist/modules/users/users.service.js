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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const digistock_business_logic_1 = require("digistock-business-logic");
let UsersService = class UsersService {
    constructor(businessUserService) {
        this.businessUserService = businessUserService;
    }
    async create(createUserDto) {
        return await this.businessUserService.create(createUserDto);
    }
    async findAll() {
        return await this.businessUserService.findAll();
    }
    async findAllByOrganization(organizationId) {
        return await this.businessUserService.findAllByOrganization(organizationId);
    }
    async findById(id) {
        return await this.businessUserService.findById(id);
    }
    async findByEmail(email) {
        return await this.businessUserService.findByEmail(email);
    }
    async update(id, updateUserDto) {
        return await this.businessUserService.update(id, updateUserDto);
    }
    async remove(id) {
        return await this.businessUserService.remove(id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [digistock_business_logic_1.UserService])
], UsersService);
//# sourceMappingURL=users.service.js.map
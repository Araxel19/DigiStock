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
exports.AuthService = exports.AuthServiceAdapter = void 0;
const common_1 = require("@nestjs/common");
const digistock_business_logic_1 = require("digistock-business-logic");
const users_service_1 = require("../users/users.service");
const jwt_service_adapter_1 = require("../../adapters/jwt.service.adapter");
let AuthServiceAdapter = class AuthServiceAdapter {
    constructor(usersService, jwtServiceAdapter) {
        this.usersService = usersService;
        this.jwtServiceAdapter = jwtServiceAdapter;
        this.authService = new digistock_business_logic_1.AuthService(this.usersService, this.jwtServiceAdapter);
    }
    async validateUser(email, password) {
        return await this.authService.validateUser(email, password);
    }
    async login(loginDto) {
        return await this.authService.login(loginDto);
    }
    async register(createUserDto) {
        return await this.authService.register(createUserDto);
    }
};
exports.AuthServiceAdapter = AuthServiceAdapter;
exports.AuthService = AuthServiceAdapter;
exports.AuthService = exports.AuthServiceAdapter = AuthServiceAdapter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_service_adapter_1.JwtServiceAdapter])
], AuthServiceAdapter);
//# sourceMappingURL=auth.service.js.map
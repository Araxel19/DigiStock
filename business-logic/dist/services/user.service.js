"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const entities_1 = require("../entities");
const bcrypt = __importStar(require("bcryptjs"));
let UserService = class UserService {
    constructor(userRepository, userRoleRepository) {
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
    }
    async create(createUserDto) {
        const { email, password, roleIds, ...userData } = createUserDto;
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new common_1.ConflictException('Email already registered');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userRepository.manager.transaction(async (manager) => {
            const newUser = manager.create(entities_1.User, {
                ...userData,
                email,
                password: hashedPassword,
            });
            const savedUser = await manager.save(newUser);
            const userRoles = roleIds.map(roleId => manager.create(entities_1.UserRole, {
                userId: savedUser.id,
                roleId: roleId,
            }));
            await manager.save(userRoles);
            return savedUser;
        });
        delete user.password;
        return user;
    }
    async findAll() {
        return this.userRepository.find({
            relations: ['organization', 'userRoles', 'userRoles.role'],
            select: {
                password: false,
            },
        });
    }
    async findById(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['organization', 'userRoles', 'userRoles.role'],
            select: {
                password: false,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async findByEmail(email) {
        return this.userRepository.findOne({
            where: { email },
            relations: ['organization', 'userRoles', 'userRoles.role'],
        });
    }
    async update(id, updateUserDto) {
        const { email, password, roleIds, ...userData } = updateUserDto;
        if (email) {
            const existingUser = await this.userRepository.findOne({ where: { email } });
            if (existingUser && existingUser.id !== id) {
                throw new common_1.ConflictException('Email already in use by another user');
            }
        }
        if (password) {
            updateUserDto.password = await bcrypt.hash(password, 10);
        }
        await this.userRepository.manager.transaction(async (manager) => {
            await manager.update(entities_1.User, id, userData);
            if (roleIds) {
                await manager.delete(entities_1.UserRole, { userId: id });
                const userRoles = roleIds.map(roleId => manager.create(entities_1.UserRole, {
                    userId: id,
                    roleId: roleId,
                }));
                await manager.save(userRoles);
            }
        });
        return this.findById(id);
    }
    async remove(id) {
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('User not found');
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IUserRepository')),
    __param(1, (0, common_1.Inject)('IUserRoleRepository')),
    __metadata("design:paramtypes", [Object, Object])
], UserService);
//# sourceMappingURL=user.service.js.map
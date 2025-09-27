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
exports.Planilla = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const organization_entity_1 = require("./organization.entity");
const planilla_item_entity_1 = require("./planilla-item.entity");
let Planilla = class Planilla {
};
exports.Planilla = Planilla;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Planilla.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', name: 'user_id' }),
    __metadata("design:type", String)
], Planilla.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.planillas),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Planilla.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', name: 'organization_id' }),
    __metadata("design:type", String)
], Planilla.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization, organization => organization.planillas),
    (0, typeorm_1.JoinColumn)({ name: 'organization_id' }),
    __metadata("design:type", organization_entity_1.Organization)
], Planilla.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_name', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Planilla.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_path', type: 'varchar', length: 500 }),
    __metadata("design:type", String)
], Planilla.prototype, "filePath", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 30,
        default: 'recibido',
    }),
    __metadata("design:type", String)
], Planilla.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'raw_ocr_data', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Planilla.prototype, "rawOcrData", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'error_message', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Planilla.prototype, "errorMessage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'uploaded_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Planilla.prototype, "uploadedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'processing_started_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], Planilla.prototype, "processingStartedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'validated_by_user_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Planilla.prototype, "validatedByUserId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.validatedPlanillas),
    (0, typeorm_1.JoinColumn)({ name: 'validated_by_user_id' }),
    __metadata("design:type", user_entity_1.User)
], Planilla.prototype, "validatedByUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'validated_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], Planilla.prototype, "validatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'processed_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], Planilla.prototype, "processedAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Planilla.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], Planilla.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => planilla_item_entity_1.PlanillaItem, item => item.planilla),
    __metadata("design:type", Array)
], Planilla.prototype, "items", void 0);
exports.Planilla = Planilla = __decorate([
    (0, typeorm_1.Entity)('planillas')
], Planilla);
//# sourceMappingURL=planilla.entity.js.map
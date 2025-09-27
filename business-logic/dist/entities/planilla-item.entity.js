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
exports.PlanillaItem = void 0;
const typeorm_1 = require("typeorm");
const planilla_entity_1 = require("./planilla.entity");
const product_entity_1 = require("./product.entity");
let PlanillaItem = class PlanillaItem {
};
exports.PlanillaItem = PlanillaItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PlanillaItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', name: 'planilla_id' }),
    __metadata("design:type", String)
], PlanillaItem.prototype, "planillaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => planilla_entity_1.Planilla, planilla => planilla.items, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'planilla_id' }),
    __metadata("design:type", planilla_entity_1.Planilla)
], PlanillaItem.prototype, "planilla", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'detected_code', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], PlanillaItem.prototype, "detectedCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'detected_name', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], PlanillaItem.prototype, "detectedName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'detected_quantity', type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], PlanillaItem.prototype, "detectedQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', name: 'corrected_product_id', nullable: true }),
    __metadata("design:type", String)
], PlanillaItem.prototype, "correctedProductId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product),
    (0, typeorm_1.JoinColumn)({ name: 'corrected_product_id' }),
    __metadata("design:type", product_entity_1.Product)
], PlanillaItem.prototype, "correctedProduct", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'corrected_quantity', type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], PlanillaItem.prototype, "correctedQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'match_status',
        type: 'varchar',
        length: 50,
        default: 'unmatched',
    }),
    __metadata("design:type", String)
], PlanillaItem.prototype, "matchStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'confidence_score', type: 'real', nullable: true }),
    __metadata("design:type", Number)
], PlanillaItem.prototype, "confidenceScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PlanillaItem.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], PlanillaItem.prototype, "createdAt", void 0);
exports.PlanillaItem = PlanillaItem = __decorate([
    (0, typeorm_1.Entity)('planilla_items')
], PlanillaItem);
//# sourceMappingURL=planilla-item.entity.js.map
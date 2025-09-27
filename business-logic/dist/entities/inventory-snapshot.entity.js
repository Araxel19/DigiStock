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
exports.InventorySnapshot = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
const planilla_entity_1 = require("./planilla.entity");
const organization_entity_1 = require("./organization.entity");
let InventorySnapshot = class InventorySnapshot {
};
exports.InventorySnapshot = InventorySnapshot;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { type: 'bigint' }),
    __metadata("design:type", String)
], InventorySnapshot.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', name: 'product_id' }),
    __metadata("design:type", String)
], InventorySnapshot.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.Product)
], InventorySnapshot.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', name: 'planilla_id' }),
    __metadata("design:type", String)
], InventorySnapshot.prototype, "planillaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => planilla_entity_1.Planilla),
    (0, typeorm_1.JoinColumn)({ name: 'planilla_id' }),
    __metadata("design:type", planilla_entity_1.Planilla)
], InventorySnapshot.prototype, "planilla", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'stock_quantity', type: 'integer' }),
    __metadata("design:type", Number)
], InventorySnapshot.prototype, "stockQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'snapshot_date', type: 'timestamptz' }),
    __metadata("design:type", Date)
], InventorySnapshot.prototype, "snapshotDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', name: 'organization_id' }),
    __metadata("design:type", String)
], InventorySnapshot.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization),
    (0, typeorm_1.JoinColumn)({ name: 'organization_id' }),
    __metadata("design:type", organization_entity_1.Organization)
], InventorySnapshot.prototype, "organization", void 0);
exports.InventorySnapshot = InventorySnapshot = __decorate([
    (0, typeorm_1.Entity)('inventory_snapshots')
], InventorySnapshot);
//# sourceMappingURL=inventory-snapshot.entity.js.map
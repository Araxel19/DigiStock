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
exports.Planilla = exports.PlanillaStatus = void 0;
const typeorm_1 = require("typeorm");
var PlanillaStatus;
(function (PlanillaStatus) {
    PlanillaStatus["PENDING"] = "pending";
    PlanillaStatus["PROCESSING"] = "processing";
    PlanillaStatus["PROCESSED"] = "processed";
    PlanillaStatus["ERROR"] = "error";
})(PlanillaStatus || (exports.PlanillaStatus = PlanillaStatus = {}));
let Planilla = class Planilla {
};
exports.Planilla = Planilla;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Planilla.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Planilla.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Planilla.prototype, "filePath", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PlanillaStatus,
        default: PlanillaStatus.PENDING,
    }),
    __metadata("design:type", String)
], Planilla.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Planilla.prototype, "ocrData", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Planilla.prototype, "extractedProducts", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Planilla.prototype, "errorMessage", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Planilla.prototype, "processedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Planilla.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Planilla.prototype, "updatedAt", void 0);
exports.Planilla = Planilla = __decorate([
    (0, typeorm_1.Entity)('planillas')
], Planilla);
//# sourceMappingURL=planilla.entity.js.map
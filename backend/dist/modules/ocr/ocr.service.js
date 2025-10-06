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
exports.OcrService = void 0;
const common_1 = require("@nestjs/common");
const digistock_business_logic_1 = require("digistock-business-logic");
let OcrService = class OcrService {
    constructor(businessOcrService) {
        this.businessOcrService = businessOcrService;
    }
    async processImage(imagePath, planillaId) {
        return await this.businessOcrService.processImage(imagePath, planillaId);
    }
    async sendToN8nWebhook(data, workflowId) {
        return await this.businessOcrService.sendToN8nWebhook(data, workflowId);
    }
    async checkN8nStatus() {
        return await this.businessOcrService.checkN8nStatus();
    }
    async saveOcrResult(planillaId, inventario) {
        return await this.businessOcrService.saveOcrResult(planillaId, inventario);
    }
};
exports.OcrService = OcrService;
exports.OcrService = OcrService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [digistock_business_logic_1.OcrService])
], OcrService);
//# sourceMappingURL=ocr.service.js.map
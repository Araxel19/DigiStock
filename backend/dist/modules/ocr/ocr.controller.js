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
exports.OcrController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const multer_1 = require("multer");
const path_1 = require("path");
const ocr_service_1 = require("./ocr.service");
const inventory_service_1 = require("../inventory/inventory.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_planilla_dto_1 = require("../inventory/dto/create-planilla.dto");
const ocr_result_dto_1 = require("./dto/ocr-result.dto");
let OcrController = class OcrController {
    constructor(ocrService, inventoryService) {
        this.ocrService = ocrService;
        this.inventoryService = inventoryService;
    }
    async processImage(file, req) {
        if (!file) {
            throw new Error('No file provided');
        }
        const createPlanillaDto = {
            fileName: file.originalname,
            filePath: `uploads/planillas/${file.filename}`,
            userId: req.user.userId,
            organizationId: req.user.organizationId,
            status: create_planilla_dto_1.PlanillaStatus.RECIBIDO,
        };
        const planilla = await this.inventoryService.createPlanilla(createPlanillaDto);
        this.ocrService.processImage(file.path, planilla.id);
        return planilla;
    }
    async receiveOcrResults(ocrResultDto) {
        await this.ocrService.saveOcrResult(ocrResultDto.planillaId, ocrResultDto.inventario);
        return { message: 'Resultados del OCR recibidos y guardados correctamente.' };
    }
    async sendToN8n(data, workflowId) {
        return await this.ocrService.sendToN8nWebhook(data, workflowId);
    }
    async checkN8nStatus() {
        return await this.ocrService.checkN8nStatus();
    }
};
exports.OcrController = OcrController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Process image with OCR' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.Post)('process'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: 'app/uploads/planillas',
            filename: (req, file, cb) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                return cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
                return cb(new Error('Only image files are allowed!'), false);
            }
            cb(null, true);
        },
        limits: {
            fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10485760,
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OcrController.prototype, "processImage", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Receive OCR results' }),
    (0, common_1.Post)('resultados'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ocr_result_dto_1.OcrResultDto]),
    __metadata("design:returntype", Promise)
], OcrController.prototype, "receiveOcrResults", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Send data to n8n workflow' }),
    (0, common_1.Post)('send-to-n8n'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)('data')),
    __param(1, (0, common_1.Body)('workflowId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OcrController.prototype, "sendToN8n", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Check n8n status' }),
    (0, common_1.Get)('n8n-status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OcrController.prototype, "checkN8nStatus", null);
exports.OcrController = OcrController = __decorate([
    (0, swagger_1.ApiTags)('OCR'),
    (0, common_1.Controller)('ocr'),
    __metadata("design:paramtypes", [ocr_service_1.OcrService,
        inventory_service_1.InventoryService])
], OcrController);
//# sourceMappingURL=ocr.controller.js.map
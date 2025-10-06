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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OcrService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let OcrService = class OcrService {
    constructor(n8nConfig, planillaRepository) {
        this.n8nConfig = n8nConfig;
        this.planillaRepository = planillaRepository;
        this.httpClient = axios_1.default.create({
            timeout: 60000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    async processImage(imagePath, planillaId) {
        try {
            const fullPath = path.resolve(process.cwd(), imagePath);
            if (!fs.existsSync(fullPath)) {
                throw new common_1.BadRequestException(`File not found at path: ${fullPath}`);
            }
            const imageBuffer = fs.readFileSync(fullPath);
            const imageBase64 = imageBuffer.toString('base64');
            const webhookUrl = `${this.n8nConfig.getBaseUrl()}/ocr-process`;
            const response = await this.httpClient.post(webhookUrl, {
                imageBase64: imageBase64,
                originalPath: imagePath,
                planillaId: planillaId,
                timestamp: new Date().toISOString(),
            });
            return {
                success: true,
                message: 'Imagen enviada a n8n para procesamiento OCR',
                data: response.data,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error enviando imagen a n8n: ${error.message}`);
        }
    }
    async sendToN8nWebhook(data, workflowId) {
        try {
            const webhookUrl = this.n8nConfig.getWebhookUrl(workflowId);
            const response = await this.httpClient.post(webhookUrl, {
                ...data,
                timestamp: new Date().toISOString(),
            });
            return response.data;
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error enviando a n8n: ${error.message}`);
        }
    }
    async checkN8nStatus() {
        try {
            const baseUrl = this.n8nConfig.getBaseUrl();
            const response = await this.httpClient.get(`${baseUrl}/health`);
            return response.data;
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error conectando con n8n: ${error.message}`);
        }
    }
    async saveOcrResult(planillaId, inventario) {
        const planilla = await this.planillaRepository.findOne({ where: { id: planillaId } });
        if (!planilla) {
            throw new common_1.NotFoundException(`La planilla con ID ${planillaId} no fue encontrada.`);
        }
        planilla.rawOcrData = inventario;
        planilla.status = 'validacion_pendiente';
        await this.planillaRepository.save(planilla);
    }
};
exports.OcrService = OcrService;
exports.OcrService = OcrService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IN8nConfig')),
    __param(1, (0, common_1.Inject)('IPlanillaRepository')),
    __metadata("design:paramtypes", [Object, Object])
], OcrService);
//# sourceMappingURL=ocr.service.js.map
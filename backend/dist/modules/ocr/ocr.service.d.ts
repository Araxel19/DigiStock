import { OcrService as BusinessOcrService } from 'digistock-business-logic';
export declare class OcrService {
    private readonly businessOcrService;
    constructor(businessOcrService: BusinessOcrService);
    processImage(imagePath: string, planillaId: string): Promise<any>;
    sendToN8nWebhook(data: any, workflowId: string): Promise<any>;
    checkN8nStatus(): Promise<any>;
    saveOcrResult(planillaId: string, inventario: any[]): Promise<void>;
}

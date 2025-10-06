import { OcrService } from './ocr.service';
import { InventoryService } from '../inventory/inventory.service';
import { OcrResultDto } from './dto/ocr-result.dto';
export declare class OcrController {
    private readonly ocrService;
    private readonly inventoryService;
    constructor(ocrService: OcrService, inventoryService: InventoryService);
    processImage(file: Express.Multer.File, req: any): Promise<import("digistock-business-logic").Planilla>;
    receiveOcrResults(ocrResultDto: OcrResultDto): Promise<{
        message: string;
    }>;
    sendToN8n(data: any, workflowId: string): Promise<any>;
    checkN8nStatus(): Promise<any>;
}

import { Injectable } from '@nestjs/common';
import { OcrService as BusinessOcrService } from 'digistock-business-logic';

@Injectable()
export class OcrService {
  constructor(
    private readonly businessOcrService: BusinessOcrService,
  ) {}

  async processImage(imagePath: string, planillaId: string): Promise<any> {
    return await this.businessOcrService.processImage(imagePath, planillaId);
  }

  async sendToN8nWebhook(data: any, workflowId: string): Promise<any> {
    return await this.businessOcrService.sendToN8nWebhook(data, workflowId);
  }

  async checkN8nStatus(): Promise<any> {
    return await this.businessOcrService.checkN8nStatus();
  }
}

import { Injectable } from '@nestjs/common';
import { OcrService } from 'digistock-business-logic';
import { N8nConfigAdapter } from '../../adapters/n8n.config.adapter';

@Injectable()
export class OcrServiceAdapter {
  private ocrService: OcrService;

  constructor(
    private readonly n8nConfigAdapter: N8nConfigAdapter,
  ) {
    this.ocrService = new OcrService(this.n8nConfigAdapter);
  }

  async processImage(imagePath: string): Promise<any> {
    return await this.ocrService.processImage(imagePath);
  }

  async sendToN8nWebhook(data: any, workflowId: string): Promise<any> {
    return await this.ocrService.sendToN8nWebhook(data, workflowId);
  }

  async checkN8nStatus(): Promise<any> {
    return await this.ocrService.checkN8nStatus();
  }
}
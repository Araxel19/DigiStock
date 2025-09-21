import { Injectable, BadRequestException } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

export interface IN8nConfig {
  getWebhookUrl(workflowId: string): string;
  getBaseUrl(): string;
}

@Injectable()
export class OcrService {
  private httpClient: AxiosInstance;

  constructor(
    private readonly n8nConfig: IN8nConfig,
  ) {
    this.httpClient = axios.create({
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async processImage(imagePath: string): Promise<any> {
    try {
      const webhookUrl = `${this.n8nConfig.getBaseUrl()}/ocr-process`;
      
      const response = await this.httpClient.post(webhookUrl, {
        filePath: imagePath,
        timestamp: new Date().toISOString(),
      });

      return {
        success: true,
        message: 'Imagen enviada a n8n para procesamiento OCR',
        data: response.data,
      };
    } catch (error) {
      throw new BadRequestException(`Error enviando imagen a n8n: ${error.message}`);
    }
  }

  async sendToN8nWebhook(data: any, workflowId: string): Promise<any> {
    try {
      const webhookUrl = this.n8nConfig.getWebhookUrl(workflowId);
      
      const response = await this.httpClient.post(webhookUrl, {
        ...data,
        timestamp: new Date().toISOString(),
      });

      return response.data;
    } catch (error) {
      throw new BadRequestException(`Error enviando a n8n: ${error.message}`);
    }
  }

  async checkN8nStatus(): Promise<any> {
    try {
      const baseUrl = this.n8nConfig.getBaseUrl();
      const response = await this.httpClient.get(`${baseUrl}/health`);
      return response.data;
    } catch (error) {
      throw new BadRequestException(`Error conectando con n8n: ${error.message}`);
    }
  }
}

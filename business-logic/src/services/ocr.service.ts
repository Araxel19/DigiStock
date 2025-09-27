import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import * as fs from 'fs';
import * as path from 'path';

export interface IN8nConfig {
  getWebhookUrl(workflowId: string): string;
  getBaseUrl(): string;
}

@Injectable()
export class OcrService {
  private httpClient: AxiosInstance;

  constructor(
    @Inject('IN8nConfig') private readonly n8nConfig: IN8nConfig,
  ) {
    this.httpClient = axios.create({
      timeout: 60000, // Increased timeout for base64 upload
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async processImage(imagePath: string, planillaId: string): Promise<any> {
    try {
      // Construct the full path. Assuming imagePath is relative to the project root.
      // This might need adjustment depending on where the app runs.
      const fullPath = path.resolve(process.cwd(), imagePath);

      if (!fs.existsSync(fullPath)) {
        throw new BadRequestException(`File not found at path: ${fullPath}`);
      }

      // Read file and convert to base64
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

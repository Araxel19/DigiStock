import { Injectable, BadRequestException } from '@nestjs/common';
import { ImageAnnotatorClient } from '@google-cloud/vision';
import { GcpConfig } from '../../config/gcp.config';
import { N8nConfig } from '../../config/n8n.config';

@Injectable()
export class OcrService {
  private visionClient: ImageAnnotatorClient;

  constructor(
    private readonly gcpConfig: GcpConfig,
    private readonly n8nConfig: N8nConfig,
  ) {
    try {
      const config = this.gcpConfig.getVisionApiConfig();
      this.visionClient = new ImageAnnotatorClient(config);
    } catch (error) {
      console.warn('Google Cloud Vision not configured properly:', error.message);
    }
  }

  async processImage(imagePath: string): Promise<any> {
    try {
      if (!this.visionClient) {
        throw new BadRequestException('OCR service not configured');
      }

      const [result] = await this.visionClient.textDetection(imagePath);
      const detections = result.textAnnotations;

      if (!detections || detections.length === 0) {
        return {
          success: false,
          message: 'No se detectó texto en la imagen',
          data: null,
        };
      }

      const extractedText = detections[0].description;
      const structuredData = this.parseInventoryText(extractedText);

      return {
        success: true,
        message: 'Texto extraído exitosamente',
        data: {
          rawText: extractedText,
          structuredData,
        },
      };
    } catch (error) {
      throw new BadRequestException(`Error en OCR: ${error.message}`);
    }
  }

  private parseInventoryText(text: string): any[] {
    // Lógica básica para extraer productos de texto OCR
    const lines = text.split('\n').filter(line => line.trim());
    const products = [];

    for (const line of lines) {
      // Patrones comunes: código | nombre | cantidad | precio
      const patterns = [
        /([A-Z0-9]+)\s+(.+?)\s+(\d+)\s+\$?(\d+\.?\d*)/,
        /(\w+)\s+(.+?)\s+(\d+)/,
      ];

      for (const pattern of patterns) {
        const match = line.match(pattern);
        if (match) {
          products.push({
            code: match[1],
            name: match[2]?.trim(),
            quantity: parseInt(match[3]) || 0,
            price: parseFloat(match[4]) || 0,
            rawLine: line,
          });
          break;
        }
      }
    }

    return products;
  }

  async sendToN8nWebhook(data: any, workflowId: string): Promise<any> {
    try {
      const webhookUrl = this.n8nConfig.getWebhookUrl(workflowId);
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw new BadRequestException(`Error enviando a n8n: ${error.message}`);
    }
  }
}
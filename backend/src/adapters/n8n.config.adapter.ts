import { Injectable } from '@nestjs/common';
import { N8nConfig } from '../config/n8n.config';
import { IN8nConfig } from 'digistock-business-logic';

@Injectable()
export class N8nConfigAdapter implements IN8nConfig {
  constructor(private readonly n8nConfig: N8nConfig) {}

  getWebhookUrl(workflowId: string): string {
    return this.n8nConfig.getWebhookUrl(workflowId);
  }

  getBaseUrl(): string {
    return process.env.N8N_WEBHOOK_URL || 'http://n8n:5678/webhook';
  }
}

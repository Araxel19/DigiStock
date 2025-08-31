import { Injectable } from '@nestjs/common';

@Injectable()
export class N8nConfig {
  getConfig() {
    return {
      host: process.env.N8N_HOST || 'localhost',
      port: parseInt(process.env.N8N_PORT) || 5678,
      webhookUrl: process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook',
    };
  }

  getWebhookUrl(workflowId: string): string {
    const config = this.getConfig();
    return `${config.webhookUrl}/${workflowId}`;
  }
}
import { N8nConfig } from '../config/n8n.config';
import { IN8nConfig } from 'digistock-business-logic';
export declare class N8nConfigAdapter implements IN8nConfig {
    private readonly n8nConfig;
    constructor(n8nConfig: N8nConfig);
    getWebhookUrl(workflowId: string): string;
    getBaseUrl(): string;
}

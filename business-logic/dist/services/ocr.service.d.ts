export interface IN8nConfig {
    getWebhookUrl(workflowId: string): string;
    getBaseUrl(): string;
}
export declare class OcrService {
    private readonly n8nConfig;
    private httpClient;
    constructor(n8nConfig: IN8nConfig);
    processImage(imagePath: string, planillaId: string): Promise<any>;
    sendToN8nWebhook(data: any, workflowId: string): Promise<any>;
    checkN8nStatus(): Promise<any>;
}

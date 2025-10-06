export declare class N8nConfig {
    getConfig(): {
        host: string;
        port: number;
        webhookUrl: string;
    };
    getWebhookUrl(workflowId: string): string;
}

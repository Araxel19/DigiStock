export declare class GcpConfig {
    getCredentials(): {
        projectId: string;
        private_key: string;
        client_email: string;
    };
    getVisionApiConfig(): {
        projectId: string;
        credentials: {
            projectId: string;
            private_key: string;
            client_email: string;
        };
    };
}

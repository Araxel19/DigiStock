export declare enum PlanillaStatus {
    PENDING = "pending",
    PROCESSING = "processing",
    PROCESSED = "processed",
    ERROR = "error"
}
export declare class Planilla {
    id: string;
    fileName: string;
    filePath: string;
    status: PlanillaStatus;
    ocrData: any;
    extractedProducts: any;
    errorMessage: string;
    processedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

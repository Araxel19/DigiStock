export declare enum PlanillaStatus {
    RECIBIDO = "recibido",
    EN_OCR = "en_ocr",
    VALIDACION_PENDIENTE = "validacion_pendiente",
    PROCESADO = "procesado",
    ERROR = "error"
}
export declare class CreatePlanillaDto {
    fileName: string;
    filePath: string;
    userId: string;
    organizationId: string;
    status?: PlanillaStatus;
}

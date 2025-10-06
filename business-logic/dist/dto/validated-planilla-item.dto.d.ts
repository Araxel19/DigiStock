declare class ValidatedPlanillaItem {
    detectedCode?: string;
    detectedName?: string;
    detectedQuantity?: number;
    correctedProductId?: string;
    correctedQuantity?: number;
    matchStatus: 'matched' | 'unmatched' | 'manual_override' | 'ambiguous';
    confidenceScore?: number;
    notes?: string;
}
export declare class ValidatedPlanillaDto {
    items: ValidatedPlanillaItem[];
}
export {};

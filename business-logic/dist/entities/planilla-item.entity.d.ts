import { Planilla } from './planilla.entity';
import { Product } from './product.entity';
export declare class PlanillaItem {
    id: string;
    planillaId: string;
    planilla: Planilla;
    detectedCode: string;
    detectedName: string;
    detectedQuantity: number;
    correctedProductId: string;
    correctedProduct: Product;
    correctedQuantity: number;
    matchStatus: 'matched' | 'unmatched' | 'manual_override' | 'ambiguous';
    confidenceScore: number;
    notes: string;
    createdAt: Date;
}

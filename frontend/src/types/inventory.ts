export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Location {
  id: string;
  name: string;
  description?: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  description?: string;
  price: number;
  organizationId: string;
  category?: Category;
  location?: Location;
  createdAt: string;
  updatedAt: string;
}

export interface PlanillaItem {
  id: string;
  detectedCode?: string;
  detectedName?: string;
  detectedQuantity?: number;
  correctedProduct?: Product;
  correctedQuantity?: number;
  matchStatus: 'matched' | 'unmatched' | 'manual_override' | 'ambiguous';
  confidenceScore?: number;
  notes?: string;
}

export interface Planilla {
  id: string;
  fileName: string;
  filePath: string;
  status: 'recibido' | 'en_ocr' | 'validacion_pendiente' | 'procesado' | 'error';
  rawOcrData?: any;
  errorMessage?: string;
  uploadedAt: string;
  processingStartedAt?: string;
  validatedAt?: string;
  processedAt?: string;
  createdAt: string;
  updatedAt: string;
  items: PlanillaItem[];
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface N8nPlanillaItem {
  productName: string;
  quantity: number;
}

export interface N8nPlanillaData {
  items: N8nPlanillaItem[];
}

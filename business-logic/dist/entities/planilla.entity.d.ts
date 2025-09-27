import { User } from './user.entity';
import { Organization } from './organization.entity';
import { PlanillaItem } from './planilla-item.entity';
export declare class Planilla {
    id: string;
    userId: string;
    user: User;
    organizationId: string;
    organization: Organization;
    fileName: string;
    filePath: string;
    status: 'recibido' | 'en_ocr' | 'validacion_pendiente' | 'procesado' | 'error';
    rawOcrData: any;
    errorMessage: string;
    uploadedAt: Date;
    processingStartedAt: Date;
    validatedByUserId: string;
    validatedByUser: User;
    validatedAt: Date;
    processedAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    items: PlanillaItem[];
}

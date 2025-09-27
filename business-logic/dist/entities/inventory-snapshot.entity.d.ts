import { Product } from './product.entity';
import { Planilla } from './planilla.entity';
import { Organization } from './organization.entity';
export declare class InventorySnapshot {
    id: string;
    productId: string;
    product: Product;
    planillaId: string;
    planilla: Planilla;
    stockQuantity: number;
    snapshotDate: Date;
    organizationId: string;
    organization: Organization;
}

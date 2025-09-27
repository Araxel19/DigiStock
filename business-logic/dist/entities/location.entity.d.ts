import { Organization } from './organization.entity';
import { Product } from './product.entity';
export declare class Location {
    id: string;
    organizationId: string;
    organization: Organization;
    name: string;
    description: string;
    products: Product[];
}

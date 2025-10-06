import { Organization } from './organization.entity';
import { Category } from './category.entity';
import { Location } from './location.entity';
export declare class Product {
    id: string;
    organizationId: string;
    organization: Organization;
    code: string;
    name: string;
    description: string;
    price: number;
    cantidad: number;
    categoryId: string;
    category: Category;
    locationId: string;
    location: Location;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

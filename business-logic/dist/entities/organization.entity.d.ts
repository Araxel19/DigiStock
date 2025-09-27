import { User } from './user.entity';
import { Product } from './product.entity';
import { Category } from './category.entity';
import { Location } from './location.entity';
import { Planilla } from './planilla.entity';
export declare class Organization {
    id: string;
    name: string;
    details: any;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    users: User[];
    products: Product[];
    categories: Category[];
    locations: Location[];
    planillas: Planilla[];
}

import { Location } from '../../locations/entities/location.entity';
export declare class Organization {
    id: string;
    name: string;
    details?: any;
    locations: Location[];
}

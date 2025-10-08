import { Organization } from '../../organization/entities/organization.entity';
export declare class Location {
    id: string;
    name: string;
    description?: string;
    organizationId: string;
    organization: Organization;
}

import { Organization } from './organization.entity';
import { UserRole } from './user-role.entity';
import { Planilla } from './planilla.entity';
export declare class User {
    id: string;
    organizationId: string;
    organization: Organization;
    isSuperAdmin: boolean;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    userRoles: UserRole[];
    planillas: Planilla[];
    validatedPlanillas: Planilla[];
}

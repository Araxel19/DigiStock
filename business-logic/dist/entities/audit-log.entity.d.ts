import { User } from './user.entity';
import { Organization } from './organization.entity';
export declare class AuditLog {
    id: string;
    userId: string;
    user: User;
    organizationId: string;
    organization: Organization;
    action: string;
    targetTable: string;
    targetRecordId: string;
    details: any;
    createdAt: Date;
}

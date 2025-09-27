import { Organization } from './organization.entity';
import { User } from './user.entity';
export declare class Report {
    id: string;
    organizationId: string;
    organization: Organization;
    generatedByUserId: string;
    generatedByUser: User;
    reportType: string;
    filePath: string;
    generatedAt: Date;
    deletedAt: Date;
}

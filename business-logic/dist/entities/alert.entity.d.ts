import { Organization } from './organization.entity';
import { User } from './user.entity';
import { Planilla } from './planilla.entity';
export declare class Alert {
    id: string;
    organizationId: string;
    organization: Organization;
    userId: string;
    user: User;
    planillaId: string;
    planilla: Planilla;
    alertType: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
}

import { IOrganizationRepository, Organization } from 'digistock-business-logic';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
export declare class OrganizationService {
    private readonly organizationRepository;
    constructor(organizationRepository: IOrganizationRepository);
    private transformOrganization;
    create(createOrganizationDto: CreateOrganizationDto): Promise<Organization>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateOrganizationDto: UpdateOrganizationDto): Promise<any>;
    remove(id: string): Promise<any>;
}

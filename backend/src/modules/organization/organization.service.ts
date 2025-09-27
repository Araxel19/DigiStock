import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { IOrganizationRepository, Organization } from 'digistock-business-logic';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationService {
  constructor(
    @Inject('IOrganizationRepository')
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  private transformOrganization(org: Organization): any {
    if (!org) return null;
    let details = {};
    try {
      // The details field might be a JSON string from the DB
      if (typeof org.details === 'string') {
        details = JSON.parse(org.details);
      } else if (typeof org.details === 'object' && org.details !== null) {
        details = org.details;
      }
    } catch (e) {
      console.error('Failed to parse organization details', e);
    }

    return {
      ...org,
      details,
      isActive: org.deletedAt === null,
      memberCount: org.users?.length || 0, // Calculate member count
    };
  }

  create(createOrganizationDto: CreateOrganizationDto) {
    const organization = this.organizationRepository.create(createOrganizationDto);
    return this.organizationRepository.save(organization);
  }

  async findAll() {
    const orgs = await this.organizationRepository.find({ relations: ['users'] });
    return orgs.map(org => this.transformOrganization(org));
  }

  async findOne(id: string) {
    const org = await this.organizationRepository.findOne({ where: { id }, relations: ['users'] });
    return this.transformOrganization(org);
  }

  update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    return this.organizationRepository.update({ id }, updateOrganizationDto);
  }

  remove(id: string) {
    return this.organizationRepository.softDelete({ id });
  }
}

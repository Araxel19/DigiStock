import { Injectable, Inject } from '@nestjs/common';
import { IRoleRepository } from 'digistock-business-logic';

@Injectable()
export class RolesService {
  constructor(
    @Inject('IRoleRepository')
    private readonly roleRepository: IRoleRepository,
  ) {}

  findAll() {
    return this.roleRepository.find();
  }
}

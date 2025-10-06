import { IRoleRepository } from 'digistock-business-logic';
export declare class RolesService {
    private readonly roleRepository;
    constructor(roleRepository: IRoleRepository);
    findAll(): Promise<import("digistock-business-logic").Role[]>;
}

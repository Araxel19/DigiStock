import { User } from '../entities';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { IUserRepository, IUserRoleRepository } from '../interfaces/repositories.interface';
export declare class UserService {
    private readonly userRepository;
    private readonly userRoleRepository;
    constructor(userRepository: IUserRepository, userRoleRepository: IUserRoleRepository);
    private transformUser;
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findAllByOrganization(organizationId: string): Promise<User[]>;
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<void>;
}

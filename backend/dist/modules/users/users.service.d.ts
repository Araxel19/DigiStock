import { UserService as BusinessUserService } from 'digistock-business-logic';
import { CreateUserDto, UpdateUserDto } from './dto';
export declare class UsersService {
    private readonly businessUserService;
    constructor(businessUserService: BusinessUserService);
    create(createUserDto: CreateUserDto): Promise<any>;
    findAll(): Promise<any[]>;
    findAllByOrganization(organizationId: string): Promise<any[]>;
    findById(id: string): Promise<any>;
    findByEmail(email: string): Promise<any | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<any>;
    remove(id: string): Promise<void>;
}

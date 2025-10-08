import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<any>;
    updateProfile(req: any, updateProfileDto: UpdateProfileDto): Promise<any>;
    create(createUserDto: CreateUserDto, req: any): Promise<any>;
    findAll(req: any): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateUserDto: UpdateUserDto, req: any): Promise<any>;
    remove(id: string, req: any): Promise<void>;
}

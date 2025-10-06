import { AuthServiceAdapter } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthServiceAdapter);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            organizationId: any;
            isSuperAdmin: any;
            roles: any;
        };
    }>;
    register(createUserDto: CreateUserDto): Promise<import("digistock-business-logic").User>;
}

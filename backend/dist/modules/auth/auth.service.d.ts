import { UsersService } from '../users/users.service';
import { JwtServiceAdapter } from '../../adapters/jwt.service.adapter';
export declare class AuthServiceAdapter {
    private readonly usersService;
    private readonly jwtServiceAdapter;
    private authService;
    constructor(usersService: UsersService, jwtServiceAdapter: JwtServiceAdapter);
    validateUser(email: string, password: string): Promise<any>;
    login(loginDto: any): Promise<{
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
    register(createUserDto: any): Promise<import("digistock-business-logic").User>;
}
export { AuthServiceAdapter as AuthService };

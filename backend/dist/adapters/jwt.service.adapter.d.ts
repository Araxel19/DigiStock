import { JwtService } from '@nestjs/jwt';
import { IJwtService } from 'digistock-business-logic';
export declare class JwtServiceAdapter implements IJwtService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    sign(payload: any): string;
}

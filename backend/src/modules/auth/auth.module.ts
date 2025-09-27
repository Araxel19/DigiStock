// backend/src/modules/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { BusinessLogicModule } from '../../business-logic/business-logic.module';
import { AuthServiceAdapter } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    BusinessLogicModule, // Importa el módulo que ya tiene todo configurado
    PassportModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthServiceAdapter,
    LocalStrategy,
    JwtStrategy
  ],
  exports: [AuthServiceAdapter],
})
export class AuthModule {}
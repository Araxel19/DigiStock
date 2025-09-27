import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { OcrModule } from './modules/ocr/ocr.module';
import { DatabaseConfig } from './config/database.config';
import { OrganizationModule } from './modules/organization/organization.module';
import { RolesModule } from './modules/roles/roles.module';
import { BusinessLogicModule } from './business-logic/business-logic.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
    BusinessLogicModule,
    AuthModule,
    UsersModule,
    InventoryModule,
    OcrModule,
    OrganizationModule,
    RolesModule,
  ],
})
export class AppModule {}
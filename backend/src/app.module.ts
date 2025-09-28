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
import { ProgressModule } from './modules/progress/progress.module';
import { FilesModule } from './modules/files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
      serveRoot: '/files',
      serveStaticOptions: {
        setHeaders: (res, path, stat) => {
          res.set('Access-Control-Allow-Origin', '*');
        },
      },
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
    ProgressModule,
    FilesModule,
  ],
})
export class AppModule {}
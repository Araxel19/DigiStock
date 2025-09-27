import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import {
  Alert,
  AuditLog,
  Category,
  InventorySnapshot,
  Location,
  Organization,
  Planilla,
  PlanillaItem,
  Product,
  Report,
  Role,
  User,
  UserRole,
} from 'digistock-business-logic';

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'digistock_user',
      password: process.env.DB_PASSWORD || 'digistock_password',
      database: process.env.DB_NAME || 'digistock_db',
      entities: [
        Alert,
        AuditLog,
        Category,
        InventorySnapshot,
        Location,
        Organization,
        Planilla,
        PlanillaItem,
        Product,
        Report,
        Role,
        User,
        UserRole,
      ],
      synchronize: process.env.NODE_ENV === 'development', // Be careful with this in production
      logging: process.env.NODE_ENV === 'development',
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    };
  }
}

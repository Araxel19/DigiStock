import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from 'digistock-business-logic';
import { UserRepositoryAdapter } from '../../adapters/user.repository.adapter';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UserRepositoryAdapter],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
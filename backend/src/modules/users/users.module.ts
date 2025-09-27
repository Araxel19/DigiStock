import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { BusinessLogicModule } from '../../business-logic/business-logic.module';

@Module({
  imports: [BusinessLogicModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}

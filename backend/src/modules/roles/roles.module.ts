import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { BusinessLogicModule } from '../../business-logic/business-logic.module';

@Module({
  imports: [BusinessLogicModule],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}

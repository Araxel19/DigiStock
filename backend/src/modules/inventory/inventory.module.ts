import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { BusinessLogicModule } from '../../business-logic/business-logic.module';

import { ProgressModule } from '../progress/progress.module';

@Module({
  imports: [BusinessLogicModule, ProgressModule],
  providers: [InventoryService],
  controllers: [InventoryController],
  exports: [InventoryService],
})
export class InventoryModule {}

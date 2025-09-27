import { Module } from '@nestjs/common';
import { OcrService } from './ocr.service';
import { OcrController } from './ocr.controller';
import { BusinessLogicModule } from '../../business-logic/business-logic.module';
import { InventoryModule } from '../inventory/inventory.module';

@Module({
  imports: [BusinessLogicModule, InventoryModule],
  providers: [OcrService],
  controllers: [OcrController],
  exports: [OcrService],
})
export class OcrModule {}

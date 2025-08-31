import { Module } from '@nestjs/common';
import { OcrService } from './ocr.service';
import { OcrController } from './ocr.controller';
import { GcpConfig } from '../../config/gcp.config';
import { N8nConfig } from '../../config/n8n.config';

@Module({
  providers: [OcrService, GcpConfig, N8nConfig],
  controllers: [OcrController],
  exports: [OcrService],
})
export class OcrModule {}
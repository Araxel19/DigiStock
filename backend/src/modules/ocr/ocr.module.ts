import { Module } from '@nestjs/common';
import { OcrServiceAdapter } from './ocr.service';
import { OcrController } from './ocr.controller';
import { N8nConfig } from '../../config/n8n.config';
import { N8nConfigAdapter } from '../../adapters/n8n.config.adapter';

@Module({
  providers: [OcrServiceAdapter, N8nConfig, N8nConfigAdapter],
  controllers: [OcrController],
  exports: [OcrServiceAdapter],
})
export class OcrModule {}
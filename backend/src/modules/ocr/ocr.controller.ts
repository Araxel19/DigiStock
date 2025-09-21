import {
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { File, diskStorage } from 'multer';
import { extname } from 'path';
import { OcrServiceAdapter } from './ocr.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('OCR')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ocr')
export class OcrController {
  constructor(private readonly ocrService: OcrServiceAdapter) {}

  @ApiOperation({ summary: 'Procesar imagen con OCR' })
  @ApiConsumes('multipart/form-data')
  @Post('process')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/planillas',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Solo se permiten imágenes'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10485760, // 10MB
      },
    }),
  )
  async processImage(@UploadedFile() file: File) {
    if (!file) {
      throw new Error('No se proporcionó archivo');
    }

    return await this.ocrService.processImage(file.path);
  }

  @ApiOperation({ summary: 'Enviar datos a flujo n8n' })
  @Post('send-to-n8n')
  async sendToN8n(
    @Body('data') data: any,
    @Body('workflowId') workflowId: string,
  ) {
    return await this.ocrService.sendToN8nWebhook(data, workflowId);
  }

  @ApiOperation({ summary: 'Verificar estado de n8n' })
  @Get('n8n-status')
  async checkN8nStatus() {
    return await this.ocrService.checkN8nStatus();
  }
}
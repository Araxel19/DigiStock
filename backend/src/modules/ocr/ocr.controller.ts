import {
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Body,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { OcrService } from './ocr.service';
import { InventoryService } from '../inventory/inventory.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePlanillaDto } from '../inventory/dto';
import { PlanillaStatus } from '../inventory/dto/create-planilla.dto';
import { OcrResultDto } from './dto/ocr-result.dto';

@ApiTags('OCR')
@Controller('ocr')
export class OcrController {
  constructor(
    private readonly ocrService: OcrService,
    private readonly inventoryService: InventoryService,
  ) { }

  @ApiOperation({ summary: 'Process image with OCR' })
  @ApiConsumes('multipart/form-data')
  @Post('process')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'app/uploads/planillas',
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
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10485760, // 10MB
      },
    }),
  )
  async processImage(@UploadedFile() file: Express.Multer.File, @Req() req) {
    if (!file) {
      throw new Error('No file provided');
    }

    const createPlanillaDto: CreatePlanillaDto = {
      fileName: file.originalname,
      filePath: `uploads/planillas/${file.filename}`,
      userId: req.user.userId,
      organizationId: req.user.organizationId,
      status: PlanillaStatus.RECIBIDO,
    };

    const planilla = await this.inventoryService.createPlanilla(createPlanillaDto);

    // Llama a n8n, pero no esperes ni devuelvas su respuesta aquí
    this.ocrService.processImage(file.path, planilla.id);

    // Devuelve el objeto 'planilla' recién creado al frontend
    return planilla;

    //return this.ocrService.processImage(file.path, planilla.id);
  }

  @ApiOperation({ summary: 'Receive OCR results' })
  @Post('resultados')
  @HttpCode(HttpStatus.OK)
  async receiveOcrResults(@Body() ocrResultDto: OcrResultDto) {
    await this.ocrService.saveOcrResult(
      ocrResultDto.planillaId,
      ocrResultDto.inventario,
    );
    return { message: 'Resultados del OCR recibidos y guardados correctamente.' };
  }

  @ApiOperation({ summary: 'Send data to n8n workflow' })
  @Post('send-to-n8n')
  @UseGuards(JwtAuthGuard)
  async sendToN8n(
    @Body('data') data: any,
    @Body('workflowId') workflowId: string,
  ) {
    return await this.ocrService.sendToN8nWebhook(data, workflowId);
  }

  @ApiOperation({ summary: 'Check n8n status' })
  @Get('n8n-status')
  @UseGuards(JwtAuthGuard)
  async checkN8nStatus() {
    return await this.ocrService.checkN8nStatus();
  }
}

import { IsString, IsNotEmpty, IsUUID, IsEnum, IsOptional } from 'class-validator';

export enum PlanillaStatus {
  RECIBIDO = 'recibido',
  EN_OCR = 'en_ocr',
  VALIDACION_PENDIENTE = 'validacion_pendiente',
  PROCESADO = 'procesado',
  ERROR = 'error',
}

export class CreatePlanillaDto {
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsNotEmpty()
  filePath: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  organizationId: string;

  @IsEnum(PlanillaStatus)
  @IsOptional()
  status?: PlanillaStatus;
}
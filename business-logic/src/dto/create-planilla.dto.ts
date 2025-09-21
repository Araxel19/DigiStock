import { IsString, IsOptional, IsEnum } from 'class-validator';
import { PlanillaStatus } from '../entities/planilla.entity';

export class CreatePlanillaDto {
  @IsString()
  fileName: string;

  @IsString()
  filePath: string;

  @IsOptional()
  @IsEnum(PlanillaStatus)
  status?: PlanillaStatus;

  @IsOptional()
  ocrData?: any;

  @IsOptional()
  extractedProducts?: any;

  @IsOptional()
  @IsString()
  errorMessage?: string;
}

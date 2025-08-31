import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlanillaDto {
  @ApiProperty({ example: 'planilla_inventario_2024.jpg' })
  @IsString()
  fileName: string;

  @ApiProperty({ example: '/uploads/planillas/planilla_inventario_2024.jpg' })
  @IsString()
  filePath: string;

  @ApiProperty({ example: 'pending' })
  @IsString()
  @IsOptional()
  status?: string;
}
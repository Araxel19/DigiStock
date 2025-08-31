import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OcrRequestDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  image: any;

  @ApiProperty({ example: 'inventory_processing' })
  @IsString()
  @IsOptional()
  workflowId?: string;
}
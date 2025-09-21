import { IsString, IsOptional } from 'class-validator';

export class OcrRequestDto {
  @IsString()
  imagePath: string;

  @IsOptional()
  @IsString()
  workflowId?: string;
}

import { IsString, IsNotEmpty, IsOptional, IsJSON } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsJSON()
  details?: any;
}

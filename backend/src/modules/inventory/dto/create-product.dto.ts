import { IsString, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'PROD001' })
  @IsString()
  code: string;

  @ApiProperty({ example: 'Laptop Dell Inspiron' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Laptop de 15 pulgadas con 8GB RAM' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 15999.99 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({ example: 'Electrónicos' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ example: 'Almacén A - Estante 1' })
  @IsString()
  @IsOptional()
  location?: string;
}
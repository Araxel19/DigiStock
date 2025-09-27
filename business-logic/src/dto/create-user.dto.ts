import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsUUID,
  IsArray,
  IsInt,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsUUID()
  @IsNotEmpty()
  organizationId: string;

  @IsArray()
  @IsInt({ each: true })
  @IsNotEmpty()
  roleIds: number[];

  @IsBoolean()
  @IsOptional()
  isSuperAdmin?: boolean;
}
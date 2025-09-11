import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsEnum,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'john.doe@example.com', description: 'Correo electrónico del usuario' })
  @IsEmail({}, { message: 'El formato del email no es válido.' })
  @IsNotEmpty({ message: 'El email no puede estar vacío.' })
  email: string;

  @ApiProperty({ example: 'Password123!', description: 'Contraseña del usuario (mínimo 8 caracteres)' })
  @IsString()
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  password: string;

  @ApiProperty({ example: 'John', description: 'Nombre del usuario' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Apellido del usuario' })
  @IsString()
  @IsNotEmpty({ message: 'El apellido no puede estar vacío.' })
  lastName: string;

  @ApiProperty({ enum: UserRole, default: UserRole.USER, description: 'Rol del usuario' })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiProperty({ default: true, description: 'Indica si el usuario está activo' })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

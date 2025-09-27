import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Crear nuevo usuario' })
  @Post()
  @UseGuards(RolesGuard)
  @Roles('super_admin', 'org_admin')
  create(@Body() createUserDto: CreateUserDto, @Req() req) {
    const user = req.user;
    if (user.isSuperAdmin) {
        return this.usersService.create(createUserDto);
    }
    // Org admin can only create users in their own organization
    createUserDto.organizationId = user.organizationId;
    // Org admin can only create users with roles 'supervisor' or 'data_entry'
    // This logic should be handled in the service or business logic layer
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @Get()
  findAll(@Req() req) {
    const user = req.user;
    if (user.isSuperAdmin) {
      return this.usersService.findAll();
    }
    return this.usersService.findAllByOrganization(user.organizationId);
  }

  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @ApiOperation({ summary: 'Actualizar usuario' })
  @Put(':id') // CORREGIDO: Cambiado de @Patch a @Put para coincidir con la petición del frontend.
  @UseGuards(RolesGuard)
  @Roles('super_admin', 'org_admin')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() req) {
    const user = req.user;
    if (user.isSuperAdmin) {
        return this.usersService.update(id, updateUserDto);
    }
    const userToUpdate = await this.usersService.findById(id);
    if (userToUpdate.organizationId !== user.organizationId) {
        throw new Error('You are not authorized to update this user');
    }
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Eliminar usuario' })
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('super_admin', 'org_admin')
  async remove(@Param('id') id: string, @Req() req) {
    const user = req.user;
    if (user.isSuperAdmin) {
        return this.usersService.remove(id);
    }
    const userToRemove = await this.usersService.findById(id);
    if (userToRemove.organizationId !== user.organizationId) {
        throw new Error('You are not authorized to remove this user');
    }
    return this.usersService.remove(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LocationsService } from './locations.service';
import { CreateLocationDto, UpdateLocationDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Locations')
@ApiBearerAuth()
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @ApiOperation({ summary: 'Create location' })
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('org_admin')
  create(@Body() createLocationDto: CreateLocationDto, @Req() req) {
    createLocationDto.organizationId = req.user.organizationId;
    return this.locationsService.create(createLocationDto);
  }

  @ApiOperation({ summary: 'Get all locations for an organization' })
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('org_admin', 'supervisor', 'data_entry')
  findAll(@Req() req) {
    return this.locationsService.findAll(req.user.organizationId);
  }

  @ApiOperation({ summary: 'Get location by ID' })
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('org_admin', 'supervisor', 'data_entry')
  findOne(@Param('id') id: string) {
    return this.locationsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update location' })
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('org_admin')
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationsService.update(id, updateLocationDto);
  }
}
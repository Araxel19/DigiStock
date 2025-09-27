import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Patch,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { CreateProductDto, UpdateProductDto, CreatePlanillaDto, UpdatePlanillaDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Inventory')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @ApiOperation({ summary: 'Create product' })
  @Post('products')
  @Roles('org_admin')
  createProduct(@Body() createProductDto: CreateProductDto, @Req() req) {
    // Assuming organizationId is on the user object from the JWT
    createProductDto.organizationId = req.user.organizationId;
    return this.inventoryService.createProduct(createProductDto);
  }

  @ApiOperation({ summary: 'Get products' })
  @Get('products')
  @Roles('org_admin', 'supervisor')
  findAllProducts(@Query('search') search: string, @Req() req) {
    return this.inventoryService.findAllProducts(req.user.organizationId, search);
  }

  @ApiOperation({ summary: 'Get product by ID' })
  @Get('products/:id')
  @Roles('org_admin', 'supervisor')
  findProduct(@Param('id') id: string) {
    return this.inventoryService.findProductById(id);
  }

  @ApiOperation({ summary: 'Update product' })
  @Put('products/:id')
  @Roles('org_admin')
  updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.inventoryService.updateProduct(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Delete product' })
  @Delete('products/:id')
  @Roles('org_admin')
  removeProduct(@Param('id') id: string) {
    return this.inventoryService.removeProduct(id);
  }

  @ApiOperation({ summary: 'Create planilla' })
  @Post('planillas')
  @Roles('org_admin', 'supervisor', 'data_entry')
  createPlanilla(@Body() createPlanillaDto: CreatePlanillaDto, @Req() req) {
    createPlanillaDto.organizationId = req.user.organizationId;
    createPlanillaDto.userId = req.user.userId;
    return this.inventoryService.createPlanilla(createPlanillaDto);
  }

  @ApiOperation({ summary: 'Get planillas' })
  @Get('planillas')
  @Roles('org_admin', 'supervisor', 'data_entry')
  findAllPlanillas(@Req() req) {
    const user = req.user;
    if(user.roles.includes('data_entry') && !user.roles.includes('supervisor') && !user.roles.includes('org_admin')) {
        return this.inventoryService.findPlanillasByUserId(user.userId);
    }
    return this.inventoryService.findAllPlanillas(req.user.organizationId);
  }

  @ApiOperation({ summary: 'Get planilla by ID' })
  @Get('planillas/:id')
  @Roles('org_admin', 'supervisor', 'data_entry')
  findPlanilla(@Param('id') id: string) {
    return this.inventoryService.findPlanillaById(id);
  }

  @ApiOperation({ summary: 'Update planilla' })
  @Put('planillas/:id')
  @Roles('org_admin', 'supervisor')
  updatePlanilla(@Param('id') id: string, @Body() updatePlanillaDto: UpdatePlanillaDto) {
    return this.inventoryService.updatePlanilla(id, updatePlanillaDto);
  }

  @ApiOperation({ summary: 'Delete planilla' })
  @Delete('planillas/:id')
  @Roles('org_admin')
  removePlanilla(@Param('id') id: string) {
    return this.inventoryService.removePlanilla(id);
  }

  @ApiOperation({ summary: 'Notify progress of processing' })
  @Post('notify-progress')
  @HttpCode(HttpStatus.OK)
  async notifyProgress(
    @Body('planillaId') planillaId: string,
    @Body('status') status: string,
    @Body('message') message: string,
  ) {
    // This endpoint will be called by n8n to update progress
    // You can implement WebSocket broadcasting here
    return {
      success: true,
      message: 'Progress notification received',
      data: { planillaId, status, message },
    };
  }
}

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

@ApiTags('Inventory')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @ApiOperation({ summary: 'Create product' })
  @Post('products')
  createProduct(@Body() createProductDto: CreateProductDto, @Req() req) {
    // Assuming organizationId is on the user object from the JWT
    createProductDto.organizationId = req.user.organizationId;
    return this.inventoryService.createProduct(createProductDto);
  }

  @ApiOperation({ summary: 'Get products' })
  @Get('products')
  findAllProducts(@Query('search') search: string, @Req() req) {
    return this.inventoryService.findAllProducts(req.user.organizationId, search);
  }

  @ApiOperation({ summary: 'Get product by ID' })
  @Get('products/:id')
  findProduct(@Param('id') id: string) {
    return this.inventoryService.findProductById(id);
  }

  @ApiOperation({ summary: 'Update product' })
  @Put('products/:id')
  updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.inventoryService.updateProduct(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Delete product' })
  @Delete('products/:id')
  removeProduct(@Param('id') id: string) {
    return this.inventoryService.removeProduct(id);
  }

  @ApiOperation({ summary: 'Create planilla' })
  @Post('planillas')
  createPlanilla(@Body() createPlanillaDto: CreatePlanillaDto, @Req() req) {
    createPlanillaDto.organizationId = req.user.organizationId;
    createPlanillaDto.userId = req.user.userId;
    return this.inventoryService.createPlanilla(createPlanillaDto);
  }

  @ApiOperation({ summary: 'Get planillas' })
  @Get('planillas')
  findAllPlanillas(@Req() req) {
    return this.inventoryService.findAllPlanillas(req.user.organizationId);
  }

  @ApiOperation({ summary: 'Get planilla by ID' })
  @Get('planillas/:id')
  findPlanilla(@Param('id') id: string) {
    return this.inventoryService.findPlanillaById(id);
  }

  @ApiOperation({ summary: 'Update planilla' })
  @Put('planillas/:id')
  updatePlanilla(@Param('id') id: string, @Body() updatePlanillaDto: UpdatePlanillaDto) {
    return this.inventoryService.updatePlanilla(id, updatePlanillaDto);
  }

  @ApiOperation({ summary: 'Delete planilla' })
  @Delete('planillas/:id')
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

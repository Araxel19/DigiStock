import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreatePlanillaDto } from './dto/create-planilla.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Inventory')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @ApiOperation({ summary: 'Crear producto' })
  @Post('products')
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.inventoryService.createProduct(createProductDto);
  }

  @ApiOperation({ summary: 'Obtener productos' })
  @Get('products')
  findAllProducts(@Query('search') search?: string) {
    return this.inventoryService.findAllProducts(search);
  }

  @ApiOperation({ summary: 'Obtener producto por ID' })
  @Get('products/:id')
  findProduct(@Param('id') id: string) {
    return this.inventoryService.findProductById(id);
  }

  @ApiOperation({ summary: 'Crear planilla' })
  @Post('planillas')
  createPlanilla(@Body() createPlanillaDto: CreatePlanillaDto) {
    return this.inventoryService.createPlanilla(createPlanillaDto);
  }

  @ApiOperation({ summary: 'Obtener planillas' })
  @Get('planillas')
  findAllPlanillas() {
    return this.inventoryService.findAllPlanillas();
  }

  @ApiOperation({ summary: 'Obtener planilla por ID' })
  @Get('planillas/:id')
  findPlanilla(@Param('id') id: string) {
    return this.inventoryService.findPlanillaById(id);
  }

  @ApiOperation({ summary: 'Actualizar estado de planilla' })
  @Patch('planillas/:id/status')
  updatePlanillaStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.inventoryService.updatePlanillaStatus(id, status);
  }
}
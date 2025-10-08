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
import { CreateProductDto, UpdateProductDto, CreatePlanillaDto, UpdatePlanillaDto, CreateCategoryDto, UpdateCategoryDto } from './dto';
import { ValidatedPlanillaDto } from 'digistock-business-logic';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ProgressGateway } from '../progress/progress.gateway';

@ApiTags('Inventory')
@ApiBearerAuth()
@Controller('inventory')
export class InventoryController {
  constructor(
    private readonly inventoryService: InventoryService,
    private readonly progressGateway: ProgressGateway,
  ) { }

  @ApiOperation({ summary: 'Get inventory stats' })
  @Get('stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('org_admin', 'supervisor')
  getDashboardStats(@Req() req) {
    return this.inventoryService.getDashboardStats(req.user.organizationId);
  }

  @ApiOperation({ summary: 'Create product' })
  @Post('products')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('org_admin')
  createProduct(@Body() createProductDto: CreateProductDto, @Req() req) {
    // Assuming organizationId is on the user object from the JWT
    createProductDto.organizationId = req.user.organizationId;
    return this.inventoryService.createProduct(createProductDto);
  }

  @ApiOperation({ summary: 'Get products' })
  @Get('products')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('org_admin', 'supervisor', 'data_entry')
  findAllProducts(@Query('search') search: string, @Req() req) {
    return this.inventoryService.findAllProducts(req.user.organizationId, search);
  }

  @ApiOperation({ summary: 'Get product by ID' })
  @Get('products/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('org_admin', 'supervisor')
  findProduct(@Param('id') id: string) {
    return this.inventoryService.findProductById(id);
  }

  @ApiOperation({ summary: 'Update product' })
  @Put('products/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('org_admin', 'supervisor', 'data_entry')
  updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Req() req) {
    return this.inventoryService.updateProduct(id, { ...updateProductDto, organizationId: req.user.organizationId });
  }

  @ApiOperation({ summary: 'Delete product' })
  @Delete('products/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('org_admin')
  removeProduct(@Param('id') id: string) {
    return this.inventoryService.removeProduct(id);
  }

  // Category methods
  @ApiOperation({ summary: 'Create category' })
  @Post('categories')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('org_admin')
  createCategory(@Body() createCategoryDto: CreateCategoryDto, @Req() req) {
    createCategoryDto.organizationId = req.user.organizationId;
    return this.inventoryService.createCategory(createCategoryDto);
  }

  @ApiOperation({ summary: 'Get categories' })
  @Get('categories')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('org_admin', 'supervisor', 'data_entry')
  findAllCategories(@Req() req) {
    return this.inventoryService.findAllCategories(req.user.organizationId);
  }

  @ApiOperation({ summary: 'Get category by ID' })
  @Get('categories/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('org_admin', 'supervisor')
  findCategory(@Param('id') id: string) {
    return this.inventoryService.findCategoryById(id);
  }

  @ApiOperation({ summary: 'Update category' })
  @Put('categories/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('org_admin')
  updateCategory(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.inventoryService.updateCategory(id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'Delete category' })
  @Delete('categories/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('org_admin')
  removeCategory(@Param('id') id: string) {
    return this.inventoryService.removeCategory(id);
  }

  @ApiOperation({ summary: 'Create planilla' })
  @Post('planillas')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('org_admin', 'supervisor', 'data_entry')
  createPlanilla(@Body() createPlanillaDto: CreatePlanillaDto, @Req() req) {
    createPlanillaDto.organizationId = req.user.organizationId;
    createPlanillaDto.userId = req.user.userId;
    return this.inventoryService.createPlanilla(createPlanillaDto);
  }

  @ApiOperation({ summary: 'Get planillas' })
  @Get('planillas')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('org_admin', 'supervisor', 'data_entry')
  findAllPlanillas(@Req() req) {
    const user = req.user;
    if (user.roles.includes('data_entry') && !user.roles.includes('supervisor') && !user.roles.includes('org_admin')) {
      return this.inventoryService.findPlanillasByUserId(user.userId);
    }
    return this.inventoryService.findAllPlanillas(req.user.organizationId);
  }

  @ApiOperation({ summary: 'Get my planillas' })
  @Get('planillas/my')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('org_admin', 'supervisor', 'data_entry')
  findMyPlanillas(@Req() req) {
    return this.inventoryService.findPlanillasByUserId(req.user.userId);
  }

  @ApiOperation({ summary: 'Get planilla by ID' })
  @Get('planillas/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('org_admin', 'supervisor', 'data_entry')
  findPlanilla(@Param('id') id: string) {
    return this.inventoryService.findPlanillaById(id);
  }

  @ApiOperation({ summary: 'Update planilla' })
  @Put('planillas/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('org_admin', 'supervisor')
  updatePlanilla(@Param('id') id: string, @Body() updatePlanillaDto: UpdatePlanillaDto) {
    return this.inventoryService.updatePlanilla(id, updatePlanillaDto);
  }

  @ApiOperation({ summary: 'Delete planilla' })
  @Delete('planillas/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('org_admin')
  removePlanilla(@Param('id') id: string) {
    return this.inventoryService.removeProduct(id);
  }

  @ApiOperation({ summary: 'Confirm validated planilla data' })
  @Post('planillas/:id/confirmar')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('org_admin', 'supervisor', 'data_entry')
  @HttpCode(HttpStatus.OK)
  async confirmPlanillaData(
    @Param('id') id: string,
    @Body() validatedPlanillaDto: ValidatedPlanillaDto,
  ) {
    return this.inventoryService.saveValidatedPlanillaItems(id, validatedPlanillaDto);
  }

  @ApiOperation({ summary: 'Notify progress of processing' })
  @Post('notify-progress')
  @HttpCode(HttpStatus.OK)
  async notifyProgress(
    @Body('planillaId') planillaId: string,
    @Body('status') status: string,
    @Body('message') message: string,
  ) {
    this.progressGateway.sendProgress(planillaId, status, message);
    return {
      success: true,
      message: 'Progress notification received',
      data: { planillaId, status, message },
    };
  }
}
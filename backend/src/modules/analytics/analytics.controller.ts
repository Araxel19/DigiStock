import { Controller, Get, Query, Req, UseGuards, Header, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Analytics')
@ApiBearerAuth()
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @ApiOperation({ summary: 'Get trends (ventas, inventario, movimientos) for a date range' })
  @Get('trends')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('org_admin', 'supervisor', 'data_entry')
  async getTrends(@Req() req, @Query('orgId') orgId?: string, @Query('range') range: '7d' | '30d' | '90d' = '7d') {
    // If user is not superadmin, force their organizationId
    const targetOrg = req.user?.isSuperAdmin ? orgId : req.user?.organizationId;
    return this.analyticsService.getTrends(targetOrg, range);
  }

  @ApiOperation({ summary: 'Get turnover (rotación) for a period' })
  @Get('turnover')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('org_admin', 'supervisor', 'data_entry')
  async getTurnover(@Req() req, @Query('orgId') orgId?: string, @Query('range') range: '7d' | '30d' | '90d' = '30d') {
    const targetOrg = req.user?.isSuperAdmin ? orgId : req.user?.organizationId;
    return this.analyticsService.getTurnover(targetOrg, range);
  }

  @ApiOperation({ summary: 'Get usage metrics (DAU/MAU, planillas/day, api calls/day, storage)' })
  @Get('usage')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('org_admin', 'supervisor', 'data_entry')
  async getUsage(@Req() req, @Query('orgId') orgId?: string, @Query('range') range: '7d' | '30d' | '90d' = '30d') {
    const targetOrg = req.user?.isSuperAdmin ? orgId : req.user?.organizationId;
    return this.analyticsService.getUsage(targetOrg, range);
  }

  @ApiOperation({ summary: 'Get per-organization comparative metrics' })
  @Get('orgs')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('org_admin', 'supervisor', 'data_entry')
  async getOrgs(
    @Req() req,
    @Query('range') range: '7d' | '30d' | '90d' = '30d',
    @Query('page') page = '1',
    @Query('perPage') perPage = '20',
    @Query('q') q?: string,
    @Query('sortKey') sortKey?: string,
    @Query('sortDir') sortDir?: 'asc' | 'desc',
  ) {
    if (!req.user?.isSuperAdmin) throw new ForbiddenException('Only super admins can access this resource')
    return this.analyticsService.getOrgsAnalysisPaginated({ range, page: Number(page), perPage: Number(perPage), q, sortKey, sortDir })
  }

  @ApiOperation({ summary: 'Export per-organization analysis as CSV' })
  @Get('orgs/export')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('org_admin', 'supervisor', 'data_entry')
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename="orgs_analysis.csv"')
  async exportOrgs(
    @Req() req,
    @Query('range') range: '7d' | '30d' | '90d' = '30d',
    @Query('q') q?: string,
    @Query('sortKey') sortKey?: string,
    @Query('sortDir') sortDir?: 'asc' | 'desc',
  ) {
    if (!req.user?.isSuperAdmin) throw new ForbiddenException('Only super admins can access this resource')
    const csv = await this.analyticsService.getOrgsAnalysisCsv({ range, q, sortKey, sortDir })
    return csv
  }
}

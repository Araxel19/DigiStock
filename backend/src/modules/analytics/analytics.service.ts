import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as fs from 'fs/promises';
import * as path from 'path';

export interface TrendsResponse {
  labels: string[];
  ventas: number[];
  inventario: number[];
  movimientos: number[];
}

@Injectable()
export class AnalyticsService {
  constructor(private dataSource: DataSource) {}

  private async rowsToMap(rows: any[]) {
    const map = new Map<string, number>();
    for (const r of rows) {
      map.set(r.day, Number(r.total || 0));
    }
    return map;
  }

  async getTrends(organizationId?: string, range: '7d' | '30d' | '90d' = '7d'): Promise<TrendsResponse> {
    let days = 90;
    if (range === '7d') days = 7;
    else if (range === '30d') days = 30;

    // ventas: sum of corrected_quantity (or detected_quantity) per processed day
    const ventasQuery = `
      SELECT to_char(date_trunc('day', COALESCE(p.processed_at, p.uploaded_at)), 'YYYY-MM-DD') AS day,
             SUM(COALESCE(pi.corrected_quantity, pi.detected_quantity)) AS total
      FROM planilla_items pi
      JOIN planillas p ON pi.planilla_id = p.id
      WHERE (COALESCE(p.processed_at, p.uploaded_at)) >= CURRENT_DATE - INTERVAL '${days - 1} day'
      ${organizationId ? 'AND p.organization_id = $1' : ''}
      GROUP BY day
      ORDER BY day
    `;

    const inventarioQuery = `
      SELECT to_char(date_trunc('day', snapshot_date), 'YYYY-MM-DD') AS day,
             SUM(stock_quantity) AS total
      FROM inventory_snapshots
      WHERE snapshot_date >= CURRENT_DATE - INTERVAL '${days - 1} day'
      ${organizationId ? 'AND organization_id = $1' : ''}
      GROUP BY day
      ORDER BY day
    `;

    const movimientosQuery = `
      SELECT to_char(date_trunc('day', pi.created_at), 'YYYY-MM-DD') AS day,
             COUNT(*) AS total
      FROM planilla_items pi
      JOIN planillas p ON pi.planilla_id = p.id
      WHERE pi.created_at >= CURRENT_DATE - INTERVAL '${days - 1} day'
      ${organizationId ? 'AND p.organization_id = $1' : ''}
      GROUP BY day
      ORDER BY day
    `;

    const ventasRows = organizationId
      ? await this.dataSource.query(ventasQuery, [organizationId])
      : await this.dataSource.query(ventasQuery);

    const inventarioRows = organizationId
      ? await this.dataSource.query(inventarioQuery, [organizationId])
      : await this.dataSource.query(inventarioQuery);

    const movimientosRows = organizationId
      ? await this.dataSource.query(movimientosQuery, [organizationId])
      : await this.dataSource.query(movimientosQuery);

    const ventasMap = await this.rowsToMap(ventasRows);
    const inventarioMap = await this.rowsToMap(inventarioRows);
    const movimientosMap = await this.rowsToMap(movimientosRows);

    const labels: string[] = [];
    const ventas: number[] = [];
    const inventario: number[] = [];
    const movimientos: number[] = [];

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayKey = d.toISOString().slice(0, 10); // YYYY-MM-DD
      labels.push(dayKey);
      ventas.push(ventasMap.get(dayKey) || 0);
      inventario.push(inventarioMap.get(dayKey) || 0);
      movimientos.push(movimientosMap.get(dayKey) || 0);
    }

    return { labels, ventas, inventario, movimientos };
  }

  async getTurnover(organizationId?: string, range: '7d' | '30d' | '90d' = '30d') {
    let days = 90;
    if (range === '7d') days = 7;
    else if (range === '30d') days = 30;

    // Total ventas en el periodo (sum of corrected or detected quantities)
    const ventasSql = `
      SELECT SUM(COALESCE(pi.corrected_quantity, pi.detected_quantity)) AS total
      FROM planilla_items pi
      JOIN planillas p ON pi.planilla_id = p.id
      WHERE (COALESCE(p.processed_at, p.uploaded_at)) >= CURRENT_DATE - INTERVAL '${days - 1} day'
      ${organizationId ? 'AND p.organization_id = $1' : ''}
    `;

    // Daily total inventory (sum of stock_quantity per day) then average over days
    const dailyInvSql = `
      SELECT to_char(date_trunc('day', snapshot_date), 'YYYY-MM-DD') as day, SUM(stock_quantity) as total
      FROM inventory_snapshots
      WHERE snapshot_date >= CURRENT_DATE - INTERVAL '${days - 1} day'
      ${organizationId ? 'AND organization_id = $1' : ''}
      GROUP BY day
      ORDER BY day
    `;

    const ventasRows = organizationId
      ? await this.dataSource.query(ventasSql, [organizationId])
      : await this.dataSource.query(ventasSql);

    const dailyRows = organizationId
      ? await this.dataSource.query(dailyInvSql, [organizationId])
      : await this.dataSource.query(dailyInvSql);

    const ventasTotal = Number(ventasRows?.[0]?.total || 0);

    // Build map for days to ensure we include days with zero snapshots
    const totalsByDay = new Map<string, number>();
    for (const r of dailyRows || []) totalsByDay.set(r.day, Number(r.total || 0));

    // Create labels and compute avg inventory across the period (fill missing days with 0)
    let sumInventory = 0;
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayKey = d.toISOString().slice(0, 10);
      sumInventory += totalsByDay.get(dayKey) || 0;
    }

    const avgInventory = days > 0 ? sumInventory / days : 0;

    const turnover = avgInventory > 0 ? ventasTotal / avgInventory : 0;

    return {
      ventasTotal,
      avgInventory,
      turnover,
    };
  }

  async getUsage(organizationId?: string, range: '7d' | '30d' | '90d' = '30d') {
    let days = 90;
    if (range === '7d') days = 7;
    else if (range === '30d') days = 30;

    // planillas processed per day
    const planillasSql = `
      SELECT to_char(date_trunc('day', processed_at), 'YYYY-MM-DD') AS day, COUNT(*) AS total
      FROM planillas
      WHERE processed_at >= CURRENT_DATE - INTERVAL '${days - 1} day'
      ${organizationId ? 'AND organization_id = $1' : ''}
      GROUP BY day
      ORDER BY day
    `;

    // api / audit logs per day
    const apiSql = `
      SELECT to_char(date_trunc('day', created_at), 'YYYY-MM-DD') AS day, COUNT(*) AS total
      FROM audit_log
      WHERE created_at >= CURRENT_DATE - INTERVAL '${days - 1} day'
      ${organizationId ? 'AND organization_id = $1' : ''}
      GROUP BY day
      ORDER BY day
    `;

    // DAU / MAU from audit_log distinct users
    const dauSql = `
      SELECT COUNT(DISTINCT user_id) AS dau
      FROM audit_log
      WHERE created_at >= CURRENT_DATE - INTERVAL '1 day'
      ${organizationId ? 'AND organization_id = $1' : ''}
    `;

    const mauSql = `
      SELECT COUNT(DISTINCT user_id) AS mau
      FROM audit_log
      WHERE created_at >= CURRENT_DATE - INTERVAL '30 day'
      ${organizationId ? 'AND organization_id = $1' : ''}
    `;

    const planillasRows = organizationId ? await this.dataSource.query(planillasSql, [organizationId]) : await this.dataSource.query(planillasSql);
    const apiRows = organizationId ? await this.dataSource.query(apiSql, [organizationId]) : await this.dataSource.query(apiSql);
    const dauRows = organizationId ? await this.dataSource.query(dauSql, [organizationId]) : await this.dataSource.query(dauSql);
    const mauRows = organizationId ? await this.dataSource.query(mauSql, [organizationId]) : await this.dataSource.query(mauSql);

    const planillasMap = new Map<string, number>();
    for (const r of planillasRows || []) planillasMap.set(r.day, Number(r.total || 0));
    const apiMap = new Map<string, number>();
    for (const r of apiRows || []) apiMap.set(r.day, Number(r.total || 0));

    const labels: string[] = [];
    const planillasPerDay: number[] = [];
    const apiCallsPerDay: number[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayKey = d.toISOString().slice(0, 10);
      labels.push(dayKey);
      planillasPerDay.push(planillasMap.get(dayKey) || 0);
      apiCallsPerDay.push(apiMap.get(dayKey) || 0);
    }

    const dau = Number(dauRows?.[0]?.dau || 0);
    const mau = Number(mauRows?.[0]?.mau || 0);

    // Storage used: sum file sizes for planillas (attempt to stat file paths)
    let storageBytes = 0;
    try {
      const files = organizationId
        ? await this.dataSource.query(`SELECT file_path FROM planillas WHERE organization_id = $1`, [organizationId])
        : await this.dataSource.query(`SELECT file_path FROM planillas`);

      for (const f of files || []) {
        const fp = f.file_path || f.filePath || f.filePath;
        if (!fp) continue;
        let abs = fp;
        if (!path.isAbsolute(fp)) {
          abs = path.join(process.cwd(), 'uploads', 'planillas', fp);
        }
        try {
          const st = await fs.stat(abs);
          if (st && st.size) storageBytes += st.size;
        } catch (e) {
          // ignore missing files
        }
      }
    } catch (e) {
      // ignore errors enumerating files
    }

    return {
      labels,
      planillasPerDay,
      apiCallsPerDay,
      dau,
      mau,
      storageBytes,
    };
  }

  async getOrgsAnalysis(range: '7d' | '30d' | '90d' = '30d') {
    let days = 90;
    if (range === '7d') days = 7;
    else if (range === '30d') days = 30;

    // All organizations
    const orgs = await this.dataSource.query(`SELECT id, name FROM organizations`);

    // Inventory cost per org
    const costSql = `SELECT organization_id, SUM(price * cantidad) AS total FROM products GROUP BY organization_id`;
    const costRows = await this.dataSource.query(costSql);

    // Ventas total per org in period
    const ventasSql = `
      SELECT p.organization_id, SUM(COALESCE(pi.corrected_quantity, pi.detected_quantity)) AS ventas_total
      FROM planilla_items pi
      JOIN planillas p ON pi.planilla_id = p.id
      WHERE (COALESCE(p.processed_at, p.uploaded_at)) >= CURRENT_DATE - INTERVAL '${days - 1} day'
      GROUP BY p.organization_id
    `;
    const ventasRows = await this.dataSource.query(ventasSql);

    // Planillas count per org in period
    const planillasSql = `
      SELECT organization_id, COUNT(*) AS planillas_count
      FROM planillas
      WHERE processed_at >= CURRENT_DATE - INTERVAL '${days - 1} day'
      GROUP BY organization_id
    `;
    const planillasRows = await this.dataSource.query(planillasSql);

    // Daily snapshots per org to compute avg inventory
    const snapshotSql = `
      SELECT organization_id, to_char(date_trunc('day', snapshot_date), 'YYYY-MM-DD') AS day, SUM(stock_quantity) AS total
      FROM inventory_snapshots
      WHERE snapshot_date >= CURRENT_DATE - INTERVAL '${days - 1} day'
      GROUP BY organization_id, day
      ORDER BY organization_id, day
    `;
    const snapshotRows = await this.dataSource.query(snapshotSql);

    const costMap = new Map<string, number>();
    for (const r of costRows || []) costMap.set(r.organization_id, Number(r.total || 0));

    const ventasMap = new Map<string, number>();
    for (const r of ventasRows || []) ventasMap.set(r.organization_id, Number(r.ventas_total || 0));

    const planillasMap = new Map<string, number>();
    for (const r of planillasRows || []) planillasMap.set(r.organization_id, Number(r.planillas_count || 0));

    // Build per-org avg inventory
    const invSums = new Map<string, number>();
    const invDays = new Map<string, number>();
    for (const r of snapshotRows || []) {
      const orgId = r.organization_id
      invSums.set(orgId, (invSums.get(orgId) || 0) + Number(r.total || 0))
      invDays.set(orgId, (invDays.get(orgId) || 0) + 1)
    }

    const results: any[] = [];
    for (const o of orgs || []) {
      const id = o.id
      const name = o.name
      const cost = costMap.get(id) || 0
      const ventas = ventasMap.get(id) || 0
      const planillasCount = planillasMap.get(id) || 0
      const sumInv = invSums.get(id) || 0
      const daysCount = invDays.get(id) || days
      const avgInventory = daysCount > 0 ? sumInv / daysCount : 0
      const turnover = avgInventory > 0 ? ventas / avgInventory : 0

      results.push({ id, name, cost, ventas, avgInventory, turnover, planillasCount })
    }

    return results
  }

  async getOrgsAnalysisPaginated(options: { range?: '7d'|'30d'|'90d', page?: number, perPage?: number, q?: string, sortKey?: string, sortDir?: 'asc'|'desc' }) {
    const { range = '30d', page = 1, perPage = 20, q = '', sortKey = 'cost', sortDir = 'desc' } = options || {}
    let days = 90
    if (range === '7d') days = 7
    else if (range === '30d') days = 30

    const allowedSort: Record<string,string> = {
      name: 'name',
      cost: 'cost',
      ventas: 'ventas',
      avgInventory: 'avg_inventory',
      turnover: 'turnover',
      planillasCount: 'planillas_count'
    }

    const orderCol = allowedSort[sortKey] || 'cost'
    const orderDir = sortDir === 'asc' ? 'ASC' : 'DESC'

    const qParam = q && q.trim() ? `%${q.trim()}%` : '%%'
    const offset = (page - 1) * perPage

    const baseQuery = `
      WITH metrics AS (
        SELECT o.id,
               o.name,
               COALESCE(cost.total,0) AS cost,
               COALESCE(ventas.ventas_total,0) AS ventas,
               COALESCE(planillas.planillas_count,0) AS planillas_count,
               COALESCE(inv.avg_inventory,0) AS avg_inventory,
               CASE WHEN COALESCE(inv.avg_inventory,0) > 0 THEN COALESCE(ventas.ventas_total,0)/COALESCE(inv.avg_inventory,0) ELSE 0 END AS turnover
        FROM organizations o
        LEFT JOIN (SELECT organization_id, SUM(price * cantidad) AS total FROM products GROUP BY organization_id) cost ON cost.organization_id = o.id
        LEFT JOIN (
          SELECT p.organization_id, SUM(COALESCE(pi.corrected_quantity, pi.detected_quantity)) AS ventas_total
          FROM planilla_items pi
          JOIN planillas p ON pi.planilla_id = p.id
          WHERE (COALESCE(p.processed_at, p.uploaded_at)) >= CURRENT_DATE - INTERVAL '${days - 1} day'
          GROUP BY p.organization_id
        ) ventas ON ventas.organization_id = o.id
        LEFT JOIN (
          SELECT organization_id, COUNT(*) AS planillas_count
          FROM planillas
          WHERE processed_at >= CURRENT_DATE - INTERVAL '${days - 1} day'
          GROUP BY organization_id
        ) planillas ON planillas.organization_id = o.id
        LEFT JOIN (
          SELECT organization_id, AVG(total) AS avg_inventory FROM (
            SELECT organization_id, to_char(date_trunc('day', snapshot_date), 'YYYY-MM-DD') AS day, SUM(stock_quantity) AS total
            FROM inventory_snapshots
            WHERE snapshot_date >= CURRENT_DATE - INTERVAL '${days - 1} day'
            GROUP BY organization_id, day
          ) s GROUP BY organization_id
        ) inv ON inv.organization_id = o.id
      )
      SELECT * FROM metrics
      WHERE name ILIKE $1
      ORDER BY ${orderCol} ${orderDir}
      LIMIT $2 OFFSET $3
    `

    const data = await this.dataSource.query(baseQuery, [qParam, perPage, offset])

    const countQuery = `SELECT COUNT(*) as total FROM organizations WHERE name ILIKE $1`
    const countRes = await this.dataSource.query(countQuery, [qParam])
    const total = Number(countRes?.[0]?.total || 0)

    return { data, total, page, perPage }
  }

  async getOrgsAnalysisCsv(options: { range?: '7d'|'30d'|'90d', q?: string, sortKey?: string, sortDir?: 'asc'|'desc' }) {
    const { range = '30d', q = '', sortKey = 'cost', sortDir = 'desc' } = options || {}
    const maxLimit = 10000
    const res = await this.getOrgsAnalysisPaginated({ range, page: 1, perPage: maxLimit, q, sortKey, sortDir })
    const rows = res.data || []

    const header = ['id','name','cost','ventas','avgInventory','turnover','planillasCount']
    const lines = [header.join(',')]
    for (const r of rows) {
      const line = [
        `${r.id}`,
        `"${(r.name || '').replace(/"/g, '""')}"`,
        `${r.cost ?? 0}`,
        `${r.ventas ?? 0}`,
        `${r.avg_inventory ?? 0}`,
        `${(r.turnover ?? 0).toFixed ? (r.turnover).toFixed(4) : r.turnover}`,
        `${r.planillas_count ?? 0}`
      ]
      lines.push(line.join(','))
    }

    return lines.join('\n')
  }
}

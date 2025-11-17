import { api } from './api'

export type AnalyticsRange = '7d' | '30d' | '90d'

export interface TrendsResponse {
  labels: string[];
  ventas: number[];
  inventario: number[];
  movimientos: number[];
}

export const analyticsService = {
  async getTrends(organizationId?: string, range: AnalyticsRange = '7d') {
    const params: any = { range }
    if (organizationId) params.orgId = organizationId
    const res = await api.get('/analytics/trends', { params })
    return res.data as TrendsResponse
  },
  async getTurnover(organizationId?: string, range: AnalyticsRange = '30d') {
    const params: any = { range }
    if (organizationId) params.orgId = organizationId
    const res = await api.get('/analytics/turnover', { params })
    return res.data as { ventasTotal: number; avgInventory: number; turnover: number }
  },
  async getUsage(organizationId?: string, range: AnalyticsRange = '30d') {
    const params: any = { range }
    if (organizationId) params.orgId = organizationId
    const res = await api.get('/analytics/usage', { params })
    return res.data as { labels: string[]; planillasPerDay: number[]; apiCallsPerDay: number[]; dau: number; mau: number; storageBytes: number }
  },
  async getOrgsAnalysis(range: AnalyticsRange = '30d') {
    const params: any = { range }
    const res = await api.get('/analytics/orgs', { params })
    return res.data; // legacy simple call
  },
  async getOrgsAnalysisPaged(opts: { range?: AnalyticsRange, page?: number, perPage?: number, q?: string, sortKey?: string, sortDir?: 'asc'|'desc' }) {
    const params: any = { range: opts.range || '30d', page: opts.page || 1, perPage: opts.perPage || 20 }
    if (opts.q) params.q = opts.q
    if (opts.sortKey) params.sortKey = opts.sortKey
    if (opts.sortDir) params.sortDir = opts.sortDir
    const res = await api.get('/analytics/orgs', { params })
    return res.data as { data: any[]; total: number; page: number; perPage: number }
  },
  async exportOrgsCsv(opts: { range?: AnalyticsRange, q?: string, sortKey?: string, sortDir?: 'asc'|'desc' }) {
    const params: any = { range: opts.range || '30d' }
    if (opts.q) params.q = opts.q
    if (opts.sortKey) params.sortKey = opts.sortKey
    if (opts.sortDir) params.sortDir = opts.sortDir
    const res = await api.get('/analytics/orgs/export', { params, responseType: 'blob' })
    return res.data as Blob
  },
}

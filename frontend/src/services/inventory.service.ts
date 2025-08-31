import { api } from './api'
import type { Product, Planilla } from '@/types/inventory'

export const inventoryService = {
  async getProducts(search?: string): Promise<Product[]> {
    const params = search ? { search } : {}
    const response = await api.get('/inventory/products', { params })
    return response.data
  },

  async getProduct(id: string): Promise<Product> {
    const response = await api.get(`/inventory/products/${id}`)
    return response.data
  },

  async createProduct(productData: Partial<Product>): Promise<Product> {
    const response = await api.post('/inventory/products', productData)
    return response.data
  },

  async getPlanillas(): Promise<Planilla[]> {
    const response = await api.get('/inventory/planillas')
    return response.data
  },

  async getPlanilla(id: string): Promise<Planilla> {
    const response = await api.get(`/inventory/planillas/${id}`)
    return response.data
  },

  async uploadPlanilla(file: File): Promise<any> {
    const formData = new FormData()
    formData.append('image', file)

    const response = await api.post('/ocr/process', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  async updatePlanillaStatus(id: string, status: string): Promise<Planilla> {
    const response = await api.patch(`/inventory/planillas/${id}/status`, { status })
    return response.data
  }
}
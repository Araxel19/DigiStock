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

  async updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
    const response = await api.put(`/inventory/products/${id}`, productData)
    return response.data
  },

  async removeProduct(id: string): Promise<void> {
    await api.delete(`/inventory/products/${id}`)
  },

  async getPlanillas(): Promise<Planilla[]> {
    const response = await api.get('/inventory/planillas')
    return response.data
  },

  async getPlanillaById(id: string): Promise<Planilla> {
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

  async updatePlanilla(id: string, planillaData: Partial<Planilla>): Promise<Planilla> {
    const response = await api.put(`/inventory/planillas/${id}`, planillaData)
    return response.data
  },

  async removePlanilla(id: string): Promise<void> {
    await api.delete(`/inventory/planillas/${id}`)
  },

  async confirmPlanillaData(id: string, validatedData: { items: any[] }): Promise<any> {
    const response = await api.post(`/inventory/planillas/${id}/confirmar`, validatedData);
    return response.data;
  }
}

import { api } from './api'

export const organizationService = {
  async getAll() {
    const res = await api.get('/organizations')
    return res.data
  },
  async getById(id: string) {
    const res = await api.get(`/organizations/${id}`)
    return res.data
  },
  async create(data: { name: string; address: string }) {
    const payload = {
      name: data.name,
      details: JSON.stringify({ address: data.address })
    };
    const res = await api.post('/organizations', payload)
    return res.data
  },
  async update(id: string, data: { name: string; address: string }) {
    const payload = {
      name: data.name,
      details: JSON.stringify({ address: data.address })
    };
    const res = await api.patch(`/organizations/${id}`, payload)
    return res.data
  },
  async delete(id: string) {
    const res = await api.delete(`/organizations/${id}`)
    return res.data
  },
}

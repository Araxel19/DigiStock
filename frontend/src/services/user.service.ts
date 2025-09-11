import { api } from './api'

export const useUserService = () => ({
  async getAll() {
    const res = await api.get('/users')
    return res.data
  },
  async create(data: any) {
    const res = await api.post('/users', data)
    return res.data
  },
  async update(id: string, data: any) {
    const res = await api.put(`/users/${id}`, data)
    return res.data
  },
  async delete(id: string) {
    const res = await api.delete(`/users/${id}`)
    return res.data
  }
})

import { api } from './api'
import type { FrontendCreateUserDto, FrontendUpdateUserDto } from '@/types/user'

export const userService = {
  async getAll() {
    const res = await api.get('/users')
    return res.data
  },
  async create(data: FrontendCreateUserDto) {
    const res = await api.post('/users', data)
    return res.data
  },
  async update(id: string, data: FrontendUpdateUserDto) {
    const res = await api.put(`/users/${id}`, data)
    return res.data
  },
  async delete(id: string) {
    const res = await api.delete(`/users/${id}`)
    return res.data
  }
}
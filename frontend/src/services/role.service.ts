import { api } from './api'

export const roleService = {
  async getAll() {
    const res = await api.get('/roles') // I need to create this endpoint in the backend.
    return res.data
  },
}

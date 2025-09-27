import { api } from './api'

export const organizationService = {
  async getAll() {
    const res = await api.get('/organizations')
    return res.data
  },
}

import { api } from './api';

// Define the Category type based on your entity
interface Category {
  id: string;
  name: string;
  description: string;
  organizationId: string;
}

export const categoryService = {
  async getAll(): Promise<Category[]> {
    const response = await api.get('/inventory/categories');
    return response.data;
  },

  async create(categoryData: Partial<Category>): Promise<Category> {
    const response = await api.post('/inventory/categories', categoryData);
    return response.data;
  },

  async update(id: string, categoryData: Partial<Category>): Promise<Category> {
    const response = await api.put(`/inventory/categories/${id}`, categoryData);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/inventory/categories/${id}`);
  },
};

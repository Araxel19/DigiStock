import { api } from './api';

// Define the Location type based on your entity
interface Location {
  id: string;
  name: string;
  description: string;
  organizationId: string;
}

export const locationService = {
  async getAll(): Promise<Location[]> {
    const response = await api.get('/locations');
    return response.data;
  },

  async create(locationData: Partial<Location>): Promise<Location> {
    const response = await api.post('/locations', locationData);
    return response.data;
  },

  async update(id: string, locationData: Partial<Location>): Promise<Location> {
    const response = await api.put(`/locations/${id}`, locationData);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/locations/${id}`);
  },
};

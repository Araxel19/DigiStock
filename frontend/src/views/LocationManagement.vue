<template>
  <div class="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Gestionar Ubicaciones</h1>
      <button @click="openCreateModal" class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">Crear Ubicación</button>
    </div>

    <!-- Locations Table -->
    <div class="bg-white shadow-lg rounded-lg overflow-hidden">
      <div v-if="loading" class="p-6 text-center">Cargando...</div>
      <div v-else-if="locations.length === 0" class="p-6 text-center text-gray-500">No se encontraron ubicaciones.</div>
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="location in locations" :key="location.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ location.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ location.description }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="openEditModal(location)" class="text-primary-600 hover:text-primary-900">Editar</button>
                <button @click="openDeleteModal(location)" class="ml-4 text-red-600 hover:text-red-900">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal for Create/Edit -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 class="text-2xl font-bold mb-6">{{ modalTitle }}</h2>
        <form @submit.prevent="handleSave">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
            <input v-model="currentLocation.name" type="text" id="name" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required>
          </div>
          <div class="mb-6">
            <label for="description" class="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea v-model="currentLocation.description" id="description" rows="3" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"></textarea>
          </div>
          <div class="flex justify-end space-x-4">
            <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">Cancelar</button>
            <button type="submit" class="px-4 py-2 bg-primary-600 text-white rounded-md">Guardar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="isDeleteModalOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h2 class="text-xl font-bold mb-4">Confirmar Eliminación</h2>
            <p>¿Estás seguro de que quieres eliminar la ubicación "{{ currentLocation.name }}"?</p>
            <div class="flex justify-end space-x-4 mt-6">
                <button @click="closeDeleteModal" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">Cancelar</button>
                <button @click="handleDelete" class="px-4 py-2 bg-red-600 text-white rounded-md">Eliminar</button>
            </div>
        </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { locationService } from '@/services/location.service';

interface Location {
  id: string;
  name: string;
  description: string;
  organizationId: string;
}

const locations = ref<Location[]>([]);
const loading = ref(true);
const isModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const isEditing = ref(false);
const currentLocation = ref<Partial<Location>>({});

const modalTitle = computed(() => isEditing.value ? 'Editar Ubicación' : 'Crear Ubicación');

const fetchLocations = async () => {
  loading.value = true;
  try {
    locations.value = await locationService.getAll();
  } catch (error) {
    console.error("Error fetching locations:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchLocations);

const openCreateModal = () => {
  isEditing.value = false;
  currentLocation.value = {};
  isModalOpen.value = true;
};

const openEditModal = (location: Location) => {
  isEditing.value = true;
  currentLocation.value = { ...location };
  isModalOpen.value = true;
};

const openDeleteModal = (location: Location) => {
    currentLocation.value = { ...location };
    isDeleteModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const closeDeleteModal = () => {
    isDeleteModalOpen.value = false;
};

const handleSave = async () => {
  try {
    if (isEditing.value) {
      await locationService.update(currentLocation.value.id!, currentLocation.value);
    } else {
      await locationService.create(currentLocation.value);
    }
    closeModal();
    fetchLocations();
  } catch (error) {
    console.error("Error saving location:", error);
  }
};

const handleDelete = async () => {
    try {
        await locationService.delete(currentLocation.value.id!)
        closeDeleteModal();
        fetchLocations();
    } catch (error) {
        console.error("Error deleting location:", error);
    }
};
</script>

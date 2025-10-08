<template>
  <div class="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Gestionar Categorías</h1>
      <button @click="openCreateModal" class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">Crear Categoría</button>
    </div>

    <!-- Categories Table -->
    <div class="bg-white shadow-lg rounded-lg overflow-hidden">
      <div v-if="loading" class="p-6 text-center">Cargando...</div>
      <div v-else-if="categories.length === 0" class="p-6 text-center text-gray-500">No se encontraron categorías.</div>
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
            <tr v-for="category in categories" :key="category.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ category.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ category.description }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="openEditModal(category)" class="text-primary-600 hover:text-primary-900">Editar</button>
                <button @click="openDeleteModal(category)" class="ml-4 text-red-600 hover:text-red-900">Eliminar</button>
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
            <input v-model="currentCategory.name" type="text" id="name" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required>
          </div>
          <div class="mb-6">
            <label for="description" class="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea v-model="currentCategory.description" id="description" rows="3" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"></textarea>
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
            <p>¿Estás seguro de que quieres eliminar la categoría "{{ currentCategory.name }}"?</p>
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
import { categoryService } from '@/services/category.service';

interface Category {
  id: string;
  name: string;
  description: string;
  organizationId: string;
}

const categories = ref<Category[]>([]);
const loading = ref(true);
const isModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const isEditing = ref(false);
const currentCategory = ref<Partial<Category>>({});

const modalTitle = computed(() => isEditing.value ? 'Editar Categoría' : 'Crear Categoría');

const fetchCategories = async () => {
  loading.value = true;
  try {
    categories.value = await categoryService.getAll();
  } catch (error) {
    console.error("Error fetching categories:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchCategories);

const openCreateModal = () => {
  isEditing.value = false;
  currentCategory.value = {};
  isModalOpen.value = true;
};

const openEditModal = (category: Category) => {
  isEditing.value = true;
  currentCategory.value = { ...category };
  isModalOpen.value = true;
};

const openDeleteModal = (category: Category) => {
    currentCategory.value = { ...category };
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
      await categoryService.update(currentCategory.value.id!, currentCategory.value);
    } else {
      await categoryService.create(currentCategory.value);
    }
    closeModal();
    fetchCategories();
  } catch (error) {
    console.error("Error saving category:", error);
  }
};

const handleDelete = async () => {
    try {
        await categoryService.delete(currentCategory.value.id!)
        closeDeleteModal();
        fetchCategories();
    } catch (error) {
        console.error("Error deleting category:", error);
    }
};
</script>

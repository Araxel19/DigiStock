<template>
  <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Gestión de Organizaciones</h2>
        <p class="text-gray-600">Crear, ver y administrar organizaciones.</p>
      </div>
      <button @click="openModal(null)" class="bg-primary-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-primary-700 transition-colors">
        Crear Organización
      </button>
    </div>

    <div class="bg-white rounded-xl shadow-soft overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Miembros</th>
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody v-if="loading" class="bg-white divide-y divide-gray-200">
          <tr v-for="n in 5" :key="n">
            <td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-200 rounded w-3/4"></div></td>
            <td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-200 rounded w-1/2"></div></td>
            <td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-200 rounded w-1/4"></div></td>
            <td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-200 rounded w-1/4"></div></td>
            <td class="px-6 py-4 whitespace-nowrap"></td>
          </tr>
        </tbody>
        <tbody v-else-if="organizations.length > 0" class="bg-white divide-y divide-gray-200">
          <tr v-for="org in organizations" :key="org.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ org.name }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500">{{ org.details?.address || 'N/A' }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="org.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                {{ org.isActive ? 'Activo' : 'Inactivo' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ org.memberCount }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button @click="openModal(org)" class="text-primary-600 hover:text-primary-900">Editar</button>
              <button @click="deleteOrganization(org.id)" class="text-red-600 hover:text-red-900 ml-4">Eliminar</button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="5" class="px-6 py-12 text-center text-gray-500">
              No se encontraron organizaciones.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h3 class="text-xl font-semibold mb-6">{{ isEditing ? 'Editar Organización' : 'Crear Nueva Organización' }}</h3>
        <form @submit.prevent="saveOrganization">
          <div class="mt-4">
            <label class="block text-sm font-medium mb-1">Nombre</label>
            <input v-model="form.name" type="text" class="w-full border-gray-300 rounded-lg shadow-sm" required />
          </div>
          <div class="mt-4">
            <label class="block text-sm font-medium mb-1">Dirección</label>
            <input v-model="form.address" type="text" class="w-full border-gray-300 rounded-lg shadow-sm" required />
          </div>
          <div class="flex justify-end space-x-3 mt-8">
            <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Cancelar</button>
            <button type="submit" class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { organizationService } from '@/services/organization.service'

interface Organization {
  id: string;
  name: string;
  details: { address: string };
  isActive: boolean;
  memberCount: number;
}

const organizations = ref<Organization[]>([])
const loading = ref(true)
const showModal = ref(false)
const isEditing = ref(false)
const currentOrgId = ref<string | null>(null)

const form = ref({
  name: '',
  address: '',
})

const fetchOrganizations = async () => {
  loading.value = true
  try {
    const response = await organizationService.getAll();
    organizations.value = response.map((org: any) => ({ ...org, memberCount: org.users?.length || 0 }));
  } catch (error) {
    console.error("Error fetching organizations:", error)
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.value = { name: '', address: '' };
  currentOrgId.value = null;
  isEditing.value = false;
};

const openModal = (org: Organization | null) => {
  if (org) {
    isEditing.value = true;
    currentOrgId.value = org.id;
    form.value = { name: org.name, address: org.details?.address || '' };
  } else {
    resetForm();
  }
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const saveOrganization = async () => {
  try {
    if (isEditing.value && currentOrgId.value) {
      await organizationService.update(currentOrgId.value, form.value);
    } else {
      await organizationService.create(form.value);
    }
    await fetchOrganizations();
    closeModal();
  } catch (error) {
    console.error("Error saving organization:", error);
    alert('Hubo un error al guardar la organización.');
  }
};

const deleteOrganization = async (id: string) => {
  if (confirm('¿Estás seguro de que quieres eliminar esta organización?')) {
    try {
      await organizationService.delete(id);
      await fetchOrganizations(); // Refresh the list
    } catch (error) {
      console.error("Error deleting organization:", error);
      alert('Hubo un error al eliminar la organización.');
    }
  }
}

onMounted(() => {
  fetchOrganizations()
})
</script>

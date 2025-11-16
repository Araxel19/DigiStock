<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-6 px-4 sm:px-6 lg:px-8">
    <!-- Grid de fondo -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none"></div>

    <div class="max-w-7xl mx-auto relative">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div class="flex items-center space-x-3">
            <div class="p-3 rounded-xl bg-gradient-to-br from-slate-700 to-slate-600 border border-slate-600">
              <svg class="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <div>
              <h2 class="text-3xl font-bold text-slate-200">Gestión de Organizaciones</h2>
              <p class="text-slate-400 mt-1">Crear, ver y administrar organizaciones</p>
            </div>
          </div>
          <button 
            @click="openModal(null)" 
            class="flex items-center gap-2 bg-slate-700 text-slate-200 px-6 py-3 rounded-lg hover:bg-slate-600 border border-slate-600 transition-all shadow-lg whitespace-nowrap"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Crear Organización
          </button>
        </div>
      </div>

      <!-- Table -->
      <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-700">
            <thead class="bg-slate-900/50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Nombre</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Dirección</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Estado</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Miembros</th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>

            <!-- Loading -->
            <tbody v-if="loading" class="divide-y divide-slate-700/50">
              <tr v-for="n in 5" :key="n" class="animate-pulse">
                <td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-slate-700 rounded w-3/4"></div></td>
                <td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-slate-700 rounded w-1/2"></div></td>
                <td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-slate-700 rounded w-1/4"></div></td>
                <td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-slate-700 rounded w-1/4"></div></td>
                <td class="px-6 py-4 whitespace-nowrap"></td>
              </tr>
            </tbody>

            <!-- Data -->
            <tbody v-else-if="organizations.length > 0" class="divide-y divide-slate-700/50">
              <tr v-for="org in organizations" :key="org.id" class="hover:bg-slate-700/30 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 rounded-lg bg-slate-700/50 border border-slate-600 flex items-center justify-center">
                      <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                      </svg>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-slate-200">{{ org.name }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-slate-400">{{ org.details?.address || 'N/A' }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    :class="org.isActive ? 'bg-emerald-900/30 text-emerald-400 border-emerald-700' : 'bg-red-900/30 text-red-400 border-red-700'" 
                    class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded border"
                  >
                    {{ org.isActive ? 'Activo' : 'Inactivo' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-slate-400 px-2 py-1 bg-slate-700/50 rounded border border-slate-600">
                    {{ org.memberCount }} miembros
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex justify-end space-x-2">
                    <button 
                      @click="openModal(org)" 
                      class="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 rounded-lg transition-all border border-transparent hover:border-slate-600"
                      title="Editar"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button 
                      @click="deleteOrganization(org.id)" 
                      class="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-all border border-transparent hover:border-red-700"
                      title="Eliminar"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>

            <!-- Empty -->
            <tbody v-else>
              <tr>
                <td colspan="5" class="px-6 py-16 text-center">
                  <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-700/50 mb-4">
                    <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                  </div>
                  <p class="text-slate-400">No se encontraron organizaciones.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-slate-800/90 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in">
          <!-- Modal Header -->
          <div class="relative h-24 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-t-2xl overflow-hidden">
            <div class="absolute inset-0 opacity-30">
              <div class="absolute top-4 left-10 w-20 h-20 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse"></div>
            </div>
            <div class="relative p-6 flex items-center justify-between">
              <h3 class="text-2xl font-bold text-white">
                {{ isEditing ? 'Editar Organización' : 'Crear Nueva Organización' }}
              </h3>
              <button
                @click="closeModal"
                class="p-2 rounded-lg bg-slate-900/50 text-white hover:bg-slate-700/50 transition-all"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Modal Content -->
          <form @submit.prevent="saveOrganization" class="p-8">
            <div class="space-y-6">
              <!-- Name -->
              <div>
                <label class="block text-sm font-semibold text-slate-300 mb-2">Nombre de la Organización</label>
                <input 
                  v-model="form.name" 
                  type="text" 
                  required
                  class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-all"
                  placeholder="Ingresa el nombre de la organización"
                />
              </div>

              <!-- Address -->
              <div>
                <label class="block text-sm font-semibold text-slate-300 mb-2">Dirección</label>
                <input 
                  v-model="form.address" 
                  type="text" 
                  required
                  class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-all"
                  placeholder="Ingresa la dirección física"
                />
              </div>
            </div>

            <!-- Modal Actions -->
            <div class="flex justify-end space-x-3 mt-8 pt-6 border-t border-slate-700">
              <button 
                type="button" 
                @click="closeModal" 
                class="px-6 py-3 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 border border-slate-600 transition-all"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                class="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-500 border border-slate-500 transition-all"
              >
                {{ isEditing ? 'Actualizar' : 'Crear' }} Organización
              </button>
            </div>
          </form>
        </div>
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
      await fetchOrganizations();
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

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
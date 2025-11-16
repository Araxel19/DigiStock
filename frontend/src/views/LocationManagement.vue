<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
    <!-- Grid de fondo -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none"></div>

    <div class="max-w-6xl mx-auto relative">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div class="flex items-center space-x-3">
            <div class="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
              <svg class="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                Gestionar Ubicaciones
              </h1>
              <p class="text-cyan-300/70 mt-1">Organiza tus productos por ubicaciones físicas</p>
            </div>
          </div>
          <button 
            @click="openCreateModal" 
            class="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/30 transform hover:scale-105 whitespace-nowrap"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Crear Ubicación
          </button>
        </div>
      </div>

      <!-- Locations Grid -->
      <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 overflow-hidden">
        <!-- Loading State -->
        <div v-if="loading" class="p-12 text-center">
          <div class="inline-block relative">
            <div class="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
          </div>
          <p class="text-cyan-300 mt-4">Cargando ubicaciones...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="locations.length === 0" class="p-12 text-center">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/10 mb-4">
            <svg class="w-10 h-10 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-2">No hay ubicaciones</h3>
          <p class="text-cyan-300/70 mb-6">Comienza creando tu primera ubicación de almacenamiento</p>
          <button 
            @click="openCreateModal"
            class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-500 hover:to-cyan-500 shadow-lg shadow-blue-500/30 transition-all"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Crear Primera Ubicación
          </button>
        </div>

        <!-- Locations Grid -->
        <div v-else class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="location in locations" 
              :key="location.id"
              class="group bg-slate-900/50 backdrop-blur-sm rounded-xl border border-blue-500/20 hover:border-blue-500/30 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden"
            >
              <!-- Card Header -->
              <div class="relative h-20 bg-gradient-to-br from-blue-600/10 via-cyan-600/10 to-blue-600/10 overflow-hidden">
                <div class="absolute inset-0 opacity-30">
                  <div class="absolute top-2 left-4 w-16 h-16 bg-blue-400 rounded-full mix-blend-overlay filter blur-xl animate-pulse" style="animation-duration: 3s;"></div>
                  <div class="absolute bottom-2 right-4 w-20 h-20 bg-cyan-400 rounded-full mix-blend-overlay filter blur-xl animate-pulse" style="animation-delay: 1s; animation-duration: 3s;"></div>
                </div>
                <div class="relative p-4 flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center">
                      <svg class="w-6 h-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                    </div>
                    <span class="px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/15 text-blue-200 border border-blue-500/25">
                      Ubicación
                    </span>
                  </div>
                </div>
              </div>

              <!-- Card Content -->
              <div class="p-6">
                <h3 class="text-lg font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                  {{ location.name }}
                </h3>
                <p class="text-sm text-cyan-300/60 mb-4 min-h-[60px]">
                  {{ location.description || 'Sin descripción' }}
                </p>

                <!-- Actions -->
                <div class="flex space-x-2 pt-4 border-t border-slate-700/50">
                  <button
                    @click="openEditModal(location)"
                    class="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-300 bg-blue-500/10 rounded-lg hover:bg-blue-500/15 border border-blue-500/20 hover:border-blue-500/30 transition-all"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    Editar
                  </button>
                  <button
                    @click="openDeleteModal(location)"
                    class="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-red-400 bg-red-500/10 rounded-lg hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 transition-all"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Create/Edit Modal -->
      <div v-if="isModalOpen" class="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-slate-800/90 backdrop-blur-xl border border-emerald-500/30 rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in">
          <!-- Modal Header -->
          <div class="relative h-24 bg-gradient-to-r from-blue-600/15 via-cyan-600/15 to-blue-600/15 rounded-t-2xl overflow-hidden">
            <div class="absolute inset-0 opacity-20">
              <div class="absolute top-4 left-10 w-20 h-20 bg-blue-400 rounded-full mix-blend-overlay filter blur-2xl animate-pulse" style="animation-duration: 3s;"></div>
            </div>
            <div class="relative p-6 flex items-center justify-between">
              <h2 class="text-2xl font-bold text-white">
                {{ modalTitle }}
              </h2>
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
          <form @submit.prevent="handleSave" class="p-8">
            <div class="space-y-6">
              <!-- Name Field -->
              <div>
                <label for="name" class="block text-sm font-semibold text-cyan-300 mb-2">
                  Nombre de la Ubicación
                </label>
                <input 
                  v-model="currentLocation.name" 
                  type="text" 
                  id="name" 
                  required
                  class="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="Ej: Bodega A, Estante 1, Almacén Principal..."
                />
              </div>

              <!-- Description Field -->
              <div>
                <label for="description" class="block text-sm font-semibold text-cyan-300 mb-2">
                  Descripción
                </label>
                <textarea 
                  v-model="currentLocation.description" 
                  id="description" 
                  rows="4"
                  class="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                  placeholder="Describe la ubicación física del almacenamiento..."
                ></textarea>
              </div>
            </div>

            <!-- Modal Actions -->
            <div class="flex justify-end space-x-3 mt-8 pt-6 border-t border-cyan-500/20">
              <button 
                type="button" 
                @click="closeModal" 
                class="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                class="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg shadow-lg shadow-blue-500/30 hover:from-blue-500 hover:to-cyan-500 transition-all"
              >
                {{ isEditing ? 'Actualizar' : 'Crear' }} Ubicación
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div v-if="isDeleteModalOpen" class="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-slate-800/90 backdrop-blur-xl border border-red-500/30 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
          <!-- Modal Header -->
          <div class="relative h-24 bg-gradient-to-r from-red-600/15 via-orange-600/15 to-red-600/15 rounded-t-2xl overflow-hidden">
            <div class="absolute inset-0 opacity-20">
              <div class="absolute top-4 left-10 w-20 h-20 bg-red-400 rounded-full mix-blend-overlay filter blur-2xl animate-pulse" style="animation-duration: 3s;"></div>
            </div>
            <div class="relative p-6 flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                  <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  </svg>
                </div>
                <h2 class="text-xl font-bold text-white">Confirmar Eliminación</h2>
              </div>
              <button
                @click="closeDeleteModal"
                class="p-2 rounded-lg bg-slate-900/50 text-white hover:bg-slate-700/50 transition-all"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Modal Content -->
          <div class="p-8">
            <p class="text-white mb-2">
              ¿Estás seguro de que deseas eliminar la ubicación?
            </p>
            <div class="bg-slate-900/50 rounded-lg p-4 border border-red-500/20 mb-6">
              <p class="text-lg font-semibold text-red-300">
                "{{ currentLocation.name }}"
              </p>
              <p class="text-sm text-slate-400 mt-1">
                Esta acción no se puede deshacer
              </p>
            </div>

            <!-- Actions -->
            <div class="flex justify-end space-x-3">
              <button 
                @click="closeDeleteModal" 
                class="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
              >
                Cancelar
              </button>
              <button 
                @click="handleDelete" 
                class="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg shadow-lg shadow-red-500/50 hover:from-red-500 hover:to-orange-500 transition-all"
              >
                Eliminar Ubicación
              </button>
            </div>
          </div>
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
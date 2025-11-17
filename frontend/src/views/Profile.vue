<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
    <!-- Grid de fondo -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none"></div>

    <div class="max-w-4xl mx-auto relative">
      <!-- Header Card -->
      <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 overflow-hidden mb-6">
        <div class="relative h-32 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 overflow-hidden">
          <!-- Efectos de circuito en el header -->
          <div class="absolute inset-0 opacity-20">
            <div class="absolute top-4 left-10 w-20 h-20 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse"></div>
            <div class="absolute bottom-4 right-10 w-24 h-24 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse" style="animation-delay: 0.5s;"></div>
          </div>
          
          <!-- Patrón de circuito -->
          <svg class="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="white"/>
              <line x1="2" y1="2" x2="10" y2="2" stroke="white" stroke-width="0.5"/>
              <line x1="10" y1="2" x2="10" y2="10" stroke="white" stroke-width="0.5"/>
            </pattern>
            <rect width="100" height="100" fill="url(#circuit)"/>
          </svg>
        </div>

        <!-- Avatar y nombre -->
        <div class="relative px-8 pb-6">
          <div class="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-16">
            <div class="relative">
              <div class="w-32 h-32 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-1 shadow-2xl shadow-cyan-500/50">
                <div class="w-full h-full rounded-xl bg-slate-800 flex items-center justify-center">
                  <svg class="w-16 h-16 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
              </div>
              <!-- Badge online -->
              <div class="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-slate-800 shadow-lg">
                <div class="w-full h-full rounded-full bg-green-400 animate-ping"></div>
              </div>
            </div>
            
            <div class="mt-4 sm:mt-0 flex-1">
              <h2 class="text-3xl font-bold text-white mb-1">
                {{ user?.firstName }} {{ user?.lastName }}
              </h2>
              <p class="text-cyan-300/70 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                {{ user?.email }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Card -->
      <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 overflow-hidden">
        <div class="p-8">
          <!-- Header Section -->
          <div class="flex items-center justify-between mb-8">
            <div class="flex items-center space-x-3">
              <div class="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-white">Información del Perfil</h3>
                <p class="text-cyan-300/60 text-sm">Gestiona tu información personal</p>
              </div>
            </div>
          </div>

          <div v-if="user" class="space-y-6">
            <!-- Nombre -->
            <div class="group">
              <label class="block text-sm font-semibold text-cyan-300 mb-3 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                Nombre
              </label>
              <div class="relative">
                <input 
                  v-model="editableUser.firstName" 
                  :disabled="!isEditing" 
                  type="text"
                  class="w-full px-4 py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-500 transition-all"
                  :class="isEditing ? 'border-cyan-500/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20' : 'border-slate-700 cursor-not-allowed'"
                  placeholder="Ingresa tu nombre"
                />
                <div v-if="!isEditing" class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Apellido -->
            <div class="group">
              <label class="block text-sm font-semibold text-cyan-300 mb-3 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                Apellido
              </label>
              <div class="relative">
                <input 
                  v-model="editableUser.lastName" 
                  :disabled="!isEditing" 
                  type="text"
                  class="w-full px-4 py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-500 transition-all"
                  :class="isEditing ? 'border-cyan-500/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20' : 'border-slate-700 cursor-not-allowed'"
                  placeholder="Ingresa tu apellido"
                />
                <div v-if="!isEditing" class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Email (Read-only) -->
            <div class="group">
              <label class="block text-sm font-semibold text-cyan-300 mb-3 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Correo Electrónico
              </label>
              <div class="relative bg-slate-900/30 border border-slate-700 rounded-lg px-4 py-3">
                <p class="text-white font-medium">{{ user.email }}</p>
                <p class="text-xs text-cyan-300/50 mt-1 flex items-center">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  El correo electrónico no se puede modificar
                </p>
              </div>
            </div>

            <!-- Organización (Read-only) -->
            <div v-if="user.organizationId" class="group">
              <label class="block text-sm font-semibold text-cyan-300 mb-3 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
                Organización
              </label>
              <div class="relative bg-slate-900/30 border border-slate-700 rounded-lg px-4 py-3">
                <p class="text-white font-medium">
                  {{ organizationName || 'Cargando...' }}
                </p>
                <p class="text-xs text-cyan-300/50 mt-1 flex items-center">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  La organización no se puede modificar
                </p>
              </div>
            </div>

            <!-- Roles Badge -->
            <div v-if="user.roles && user.roles.length > 0" class="group">
              <label class="block text-sm font-semibold text-cyan-300 mb-3 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
                Roles
              </label>
              <div class="flex flex-wrap gap-2">
                <span v-for="role in user.roles" :key="role" 
                  class="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30">
                  {{ role }}
                </span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="border-t border-slate-700 pt-6 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
              <button 
                v-if="isEditing" 
                @click="cancelEdit"
                class="px-6 py-3 bg-slate-700 text-white text-sm font-medium rounded-lg border border-slate-600 hover:bg-slate-600 transition-all flex items-center justify-center"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                Cancelar
              </button>
              <button 
                v-if="isEditing" 
                @click="saveProfile"
                class="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-medium rounded-lg shadow-lg shadow-cyan-500/50 hover:from-cyan-500 hover:to-blue-500 transition-all flex items-center justify-center"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                Guardar Cambios
              </button>
              <button 
                v-if="!isEditing" 
                @click="isEditing = true"
                class="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-medium rounded-lg shadow-lg shadow-cyan-500/50 hover:from-cyan-500 hover:to-blue-500 transition-all flex items-center justify-center group"
              >
                <svg class="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
                Editar Perfil
              </button>
            </div>

            <!-- Success Message -->
            <div v-if="successMessage" class="p-4 bg-green-500/10 border border-green-500/30 rounded-lg backdrop-blur-sm">
              <div class="flex items-start">
                <svg class="h-5 w-5 text-green-400 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p class="text-sm text-green-300">{{ successMessage }}</p>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="p-4 bg-red-500/10 border border-red-500/30 rounded-lg backdrop-blur-sm">
              <div class="flex items-start">
                <svg class="h-5 w-5 text-red-400 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p class="text-sm text-red-300">{{ errorMessage }}</p>
              </div>
            </div>
          </div>

          <!-- Loading State -->
          <div v-else class="text-center py-16">
            <div class="inline-block relative">
              <div class="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
            </div>
            <p class="text-cyan-300 mt-4">Cargando perfil...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useToastStore } from '@/composables/useToast';
import { storeToRefs } from 'pinia';
import { organizationService } from '@/services/organization.service'

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const isEditing = ref(false);
const editableUser = reactive({ firstName: '', lastName: '' });
const successMessage = ref('');
const errorMessage = ref('');
const organizationName = ref<string>('');

const setupEditableUser = () => {
  if (user.value) {
    editableUser.firstName = user.value.firstName;
    editableUser.lastName = user.value.lastName;
  }
};

onMounted(async () => {
  if (!user.value) {
    await authStore.fetchUser();
  }
  setupEditableUser();

  if (user.value?.organizationId) {
    try {
      const org = await organizationService.getById(user.value.organizationId);
      organizationName.value = org.name;
    } catch (err) {
      console.error('Error al obtener la organización:', err);
      organizationName.value = 'Desconocida';
      const { error: showError } = useToastStore();
      showError('Error al cargar la organización');
    }
  }
});

const cancelEdit = () => {
  setupEditableUser();
  isEditing.value = false;
};

const saveProfile = async () => {
  successMessage.value = '';
  errorMessage.value = '';
  try {
    await authStore.updateProfile(editableUser);
    successMessage.value = 'Perfil actualizado con éxito.';
    isEditing.value = false;
  } catch (error) {
    errorMessage.value = 'Error al actualizar el perfil.';
    console.error(error);
    const { error: showError } = useToastStore();
    showError('Error al actualizar el perfil');
  }
};
</script>
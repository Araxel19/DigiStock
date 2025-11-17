<template>
  <main class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
    <!-- Grid de fondo -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none"></div>

    <div class="max-w-7xl mx-auto relative">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center space-x-3 mb-3">
          <div class="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30">
            <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
          </div>
          <div>
            <h2 class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Gestión de Usuarios
            </h2>
            <p class="text-cyan-300/70 mt-1">Crea, actualiza y gestiona los usuarios del sistema</p>
          </div>
        </div>
      </div>

      <!-- Controls Bar -->
      <div class="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-cyan-500/20 shadow-lg p-6 mb-6">
        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
            <!-- Search -->
            <div class="relative w-full sm:w-80">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Buscar por nombre o email..." 
                class="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>

            <!-- Organization Filter -->
            <div v-if="authStore.user?.isSuperAdmin" class="relative w-full sm:w-64">
              <select 
                v-model="selectedOrg" 
                class="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                <option value="">Todas las organizaciones</option>
                <option v-for="org in organizations" :key="org.id" :value="org.id">{{ org.name }}</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- New User Button -->
          <button 
            @click="openCreateModal" 
            :disabled="loading" 
            class="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 whitespace-nowrap"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Nuevo Usuario
          </button>
        </div>
      </div>

      <!-- Users Table -->
      <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 overflow-hidden">
        <!-- Loading State -->
        <div v-if="loading" class="p-6">
          <div v-for="n in 5" :key="n" class="animate-pulse flex space-x-4 py-4 border-b border-slate-700/50">
            <div class="flex-1 space-y-3 py-1">
              <div class="h-4 bg-slate-700 rounded w-3/4"></div>
              <div class="h-3 bg-slate-700 rounded w-1/2"></div>
            </div>
            <div class="h-4 bg-slate-700 rounded w-1/6"></div>
            <div class="h-4 bg-slate-700 rounded w-1/6"></div>
          </div>
        </div>

        <!-- Table Content -->
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-700">
            <thead class="bg-slate-900/50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider">Usuario</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider">Organización</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider">Roles</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider">Miembro Desde</th>
                <th class="px-6 py-4 text-right text-xs font-semibold text-cyan-300 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-700/50">
              <tr v-for="user in paginatedUsers" :key="user.id" class="hover:bg-slate-700/30 transition-colors group">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
                      <span class="text-cyan-400 font-semibold text-sm">
                        {{ user.firstName.charAt(0) }}{{ user.lastName.charAt(0) }}
                      </span>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-white">{{ user.firstName }} {{ user.lastName }}</div>
                      <div class="text-sm text-cyan-300/60">{{ user.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-slate-300">{{ getOrganizationName(user.organizationId) }}</span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="roleName in user.roles || []" 
                      :key="roleName" 
                      class="px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    >
                      {{ roleName }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-slate-400">{{ formatDate(user.created_at) }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex justify-end space-x-2">
                    <button 
                      @click="openEditModal(user)" 
                      class="p-2 text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all border border-transparent hover:border-cyan-500/30"
                      title="Editar"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button 
                      @click="confirmDeleteUser(user.id)" 
                      class="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all border border-transparent hover:border-red-500/30"
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
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="px-6 py-4 border-t border-slate-700/50 bg-slate-900/30">
          <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
            <span class="text-sm text-cyan-300/70">
              Mostrando {{ paginatedUsers.length }} de {{ filteredUsers.length }} usuarios
            </span>
            <div class="flex space-x-2">
              <button 
                @click="prevPage" 
                :disabled="currentPage === 1" 
                class="px-4 py-2 border border-cyan-500/30 rounded-lg text-cyan-300 hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Anterior
              </button>
              <div class="flex items-center px-4 py-2 bg-slate-900/50 border border-cyan-500/30 rounded-lg">
                <span class="text-cyan-300">{{ currentPage }} / {{ totalPages }}</span>
              </div>
              <button 
                @click="nextPage" 
                :disabled="currentPage === totalPages" 
                class="px-4 py-2 border border-cyan-500/30 rounded-lg text-cyan-300 hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-slate-800/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-2xl w-full max-w-2xl animate-fade-in">
          <!-- Modal Header -->
          <div class="relative h-24 bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-purple-600/30 rounded-t-2xl overflow-hidden">
            <div class="absolute inset-0 opacity-30">
              <div class="absolute top-4 left-10 w-20 h-20 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse"></div>
            </div>
            <div class="relative p-6 flex items-center justify-between">
              <h3 class="text-2xl font-bold text-white">
                {{ isEditing ? 'Editar Usuario' : 'Crear Nuevo Usuario' }}
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
          <form @submit.prevent="saveUser" class="p-8">
            <!-- Error Message -->
            <div v-if="modalError" class="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div class="flex items-start">
                <svg class="w-5 h-5 text-red-400 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p class="text-sm text-red-300">{{ modalError }}</p>
              </div>
            </div>

            <!-- Form Fields -->
            <div class="space-y-6">
              <!-- Name Fields -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-cyan-300 mb-2">Nombre</label>
                  <input 
                    v-model="form.firstName" 
                    type="text" 
                    required
                    class="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="Ingresa el nombre"
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-cyan-300 mb-2">Apellido</label>
                  <input 
                    v-model="form.lastName" 
                    type="text" 
                    required
                    class="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="Ingresa el apellido"
                  />
                </div>
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-semibold text-cyan-300 mb-2">Email</label>
                <input 
                  v-model="form.email" 
                  type="email" 
                  required
                  class="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="usuario@ejemplo.com"
                />
              </div>

              <!-- Password -->
              <div>
                <label class="block text-sm font-semibold text-cyan-300 mb-2">Contraseña</label>
                <input 
                  v-model="form.password" 
                  type="password" 
                  :placeholder="isEditing ? 'Dejar en blanco para no cambiar' : 'Ingresa una contraseña segura'"
                  :required="!isEditing"
                  class="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>

              <!-- Organization -->
              <div>
                <label class="block text-sm font-semibold text-cyan-300 mb-2">Organización</label>
                <div class="relative">
                  <select 
                    v-model="form.organizationId" 
                    :disabled="!authStore.user?.isSuperAdmin" 
                    required
                    class="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="" disabled>Selecciona una organización</option>
                    <option v-for="org in organizations" :key="org.id" :value="org.id">{{ org.name }}</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Roles -->
              <div>
                <label class="block text-sm font-semibold text-cyan-300 mb-3">Roles</label>
                <div class="grid grid-cols-2 gap-3">
                  <div v-for="role in availableRoles" :key="role.id" class="flex items-center">
                    <input 
                      type="checkbox" 
                      :id="'role_' + role.id" 
                      :value="role.id" 
                      v-model="form.roleIds"
                      class="w-4 h-4 text-cyan-600 bg-slate-900/50 border-cyan-500/30 rounded focus:ring-cyan-500 focus:ring-2"
                    />
                    <label 
                      :for="'role_' + role.id" 
                      class="ml-2 text-sm text-white cursor-pointer hover:text-cyan-300 transition-colors"
                    >
                      {{ role.name }}
                    </label>
                  </div>
                </div>
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
                class="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg shadow-lg shadow-cyan-500/50 hover:from-cyan-500 hover:to-blue-500 transition-all"
              >
                {{ isEditing ? 'Actualizar' : 'Crear' }} Usuario
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { userService } from '@/services/user.service';
import { organizationService } from '@/services/organization.service';
import { roleService } from '@/services/role.service';
import { useAuthStore } from '@/store/auth';
import { useToastStore } from '@/composables/useToast';
import type { User } from '@/types/auth';
import type { FrontendCreateUserDto, FrontendUpdateUserDto } from '@/types/user';

interface Organization {
  id: string;
  name: string;
}

interface Role {
  id: number;
  name: string;
}

const authStore = useAuthStore();
const loading = ref(true);

const users = ref<User[]>([]);
const organizations = ref<Organization[]>([]);
const allRoles = ref<Role[]>([]);
const showModal = ref(false);
const isEditing = ref(false);
const currentUser = ref<User | null>(null);
const searchQuery = ref('');
const selectedOrg = ref('');
const modalError = ref('');

const form = ref<FrontendCreateUserDto & { password?: string }> ({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  organizationId: '',
  roleIds: [],
});

const formatDate = (dateString: any) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const currentPage = ref(1);
const itemsPerPage = ref(7);
const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage.value) || 1);

const availableRoles = computed(() => {
    if (authStore.user?.isSuperAdmin) {
        return allRoles.value;
    }
    if (authStore.user?.roles.includes('org_admin')) {
        return allRoles.value.filter((role:any) => ['supervisor', 'data_entry'].includes(role.name));
    }
    return [];
});

const filteredUsers = computed(() => {
  let filtered = users.value;
  if (authStore.user?.isSuperAdmin && selectedOrg.value) {
      filtered = filtered.filter((user:any) => user.organizationId === selectedOrg.value);
  }
  if (!searchQuery.value) return filtered;
  const query = searchQuery.value.toLowerCase();
  return filtered.filter((user:any) =>
    user.firstName.toLowerCase().includes(query) ||
    user.lastName.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query)
  );
});

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredUsers.value.slice(start, end);
});

const fetchUsers = async () => {
  try {
    users.value = await userService.getAll();
    users.value.sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  } catch (error) {
    console.error("Error fetching users:", error);
    const { error: showError } = useToastStore();
    showError('Error al cargar usuarios');
  }
};

const fetchOrganizations = async () => {
  try {
    if (authStore.user?.isSuperAdmin) {
        organizations.value = await organizationService.getAll();
    } else if (authStore.user?.organizationId) {
        const org = await organizationService.getById(authStore.user.organizationId);
        if (org) {
          organizations.value = [org];
        }
    }
  } catch (error) {
    console.error("Error fetching organizations:", error);
    const { error: showError } = useToastStore();
    showError('Error al cargar organizaciones');
  }
};

const fetchRoles = async () => {
  try {
    allRoles.value = await roleService.getAll();
  } catch (error) {
    console.error("Error fetching roles:", error);
    const { error: showError } = useToastStore();
    showError('Error al cargar roles');
  }
};

const fetchInitialData = async () => {
  loading.value = true;
  try {
    await Promise.all([
      fetchUsers(),
      fetchOrganizations(),
      fetchRoles(),
    ]);
  } catch (error) {
    console.error("Error fetching initial data:", error);
    const { error: showError } = useToastStore();
    showError('Error al cargar datos iniciales');
  } finally {
    loading.value = false;
  }
};

const getOrganizationName = (orgId: string) => {
  const organization = organizations.value.find((org:any) => org.id === orgId);
  return organization ? organization.name : 'N/A';
};

const resetForm = () => {
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    organizationId: authStore.user?.isSuperAdmin ? '' : authStore.user?.organizationId || '',
    roleIds: [],
  };
};

const openCreateModal = () => {
  isEditing.value = false;
  currentUser.value = null;
  resetForm();
  modalError.value = '';
  showModal.value = true;
};

const openEditModal = (user: User) => {
  isEditing.value = true;
  currentUser.value = user;
  modalError.value = '';
  form.value = { 
    ...user, 
    password: '', 
    organizationId: user.organizationId, 
    roleIds: allRoles.value.filter((role:any) => (user.roles || []).includes(role.name)).map((role:any) => role.id)
  };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  modalError.value = '';
};

const saveUser = async () => {
  modalError.value = '';
  try {
    const { firstName, lastName, email, organizationId, roleIds, password } = form.value;
    
    if (isEditing.value && currentUser.value) {
      const payload: FrontendUpdateUserDto = {
        firstName,
        lastName,
        email,
        organizationId,
        roleIds,
      };
      if (password) {
        payload.password = password;
      }
      await userService.update(currentUser.value.id, payload);
    } else {
      const payload: FrontendCreateUserDto = {
        firstName,
        lastName,
        email,
        organizationId,
        roleIds,
        password: password || '',
      };
      await userService.create(payload);
    }

    closeModal();
    await fetchUsers();
  } catch (err: any) {
    console.error("Error saving user:", err);
    const { error: showError } = useToastStore();
    if (err.response?.data?.message) {
      if (Array.isArray(err.response.data.message)) {
        modalError.value = err.response.data.message.join(', ');
      }
      else if (typeof err.response.data.message === 'string') {
        modalError.value = err.response.data.message;
      }
      else {
        modalError.value = 'Error al guardar usuario';
      }
    } else {
      modalError.value = 'Error al guardar usuario';
    }
    showError(modalError.value);
  }
};

const confirmDeleteUser = (id: string) => {
  if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
    deleteUser(id);
  }
};

const deleteUser = async (id: string) => {
  try {
    await userService.delete(id);
    await fetchUsers();
  } catch (error) {
    console.error("Error deleting user:", error);
    const { error: showError } = useToastStore();
    showError(`Error al eliminar usuario: ${(error as Error).message}`);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

onMounted(() => {
  fetchInitialData();
});
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
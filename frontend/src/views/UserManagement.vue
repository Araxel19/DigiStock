<template>
  <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div class="mb-8">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900">Gestión de Usuarios</h2>
      <p class="text-gray-600 mt-1">Crea, actualiza y gestiona los usuarios del sistema.</p>
    </div>

    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center gap-4">
          <div class="relative w-full max-w-xs">
            <input v-model="searchQuery" type="text" placeholder="Buscar por nombre o email..." class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500">
          </div>
          <div v-if="authStore.user?.isSuperAdmin" class="relative w-full max-w-xs">
              <select v-model="selectedOrg" class="w-full border-gray-300 rounded-lg shadow-sm">
                <option value="">Todas las organizaciones</option>
                <option v-for="org in organizations" :key="org.id" :value="org.id">{{ org.name }}</option>
              </select>
          </div>
      </div>
      <button @click="openCreateModal" :disabled="loading" class="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors shadow disabled:opacity-50">
        Nuevo Usuario
      </button>
    </div>

    <!-- Users Table -->
    <div class="bg-white rounded-xl shadow-soft overflow-hidden">
      <div v-if="loading" class="p-6">
        <!-- Loading skeleton -->
        <div v-for="n in 5" :key="n" class="animate-pulse flex space-x-4 py-4 border-b border-gray-200">
          <div class="flex-1 space-y-3 py-1">
            <div class="h-3 bg-gray-200 rounded w-3/4"></div>
            <div class="h-2 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div class="h-4 bg-gray-200 rounded w-1/6"></div>
          <div class="h-4 bg-gray-200 rounded w-1/6"></div>
        </div>
      </div>
      <table v-else class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organización</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roles</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Miembro Desde</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in paginatedUsers" :key="user.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ user.firstName }} {{ user.lastName }}</div>
                  <div class="text-sm text-gray-500">{{ user.email }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ getOrganizationName(user.organizationId) }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex flex-wrap gap-1">
                <span v-for="roleName in user.roles || []" :key="roleName" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {{ roleName }}
                </span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(user.created_at) }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
              <button @click="openEditModal(user)" class="p-2 text-primary-600 hover:bg-primary-100 rounded-full transition-colors" title="Editar">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg>
              </button>
              <button @click="confirmDeleteUser(user.id)" class="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors" title="Eliminar">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex justify-between items-center mt-6">
      <span class="text-sm text-gray-600">Mostrando {{ paginatedUsers.length }} de {{ filteredUsers.length }} usuarios</span>
      <div class="flex space-x-2">
        <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1 border rounded-md disabled:opacity-50">Anterior</button>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 py-1 border rounded-md disabled:opacity-50">Siguiente</button>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h3 class="text-xl font-semibold mb-6">{{ isEditing ? 'Editar Usuario' : 'Crear Nuevo Usuario' }}</h3>
        <div v-if="modalError" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-sm text-red-600">{{ modalError }}</p>
        </div>
        <form @submit.prevent="saveUser">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Nombre</label>
              <input v-model="form.firstName" type="text" class="w-full border-gray-300 rounded-lg shadow-sm" required />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Apellido</label>
              <input v-model="form.lastName" type="text" class="w-full border-gray-300 rounded-lg shadow-sm" required />
            </div>
          </div>
          <div class="mt-4">
            <label class="block text-sm font-medium mb-1">Email</label>
            <input v-model="form.email" type="email" class="w-full border-gray-300 rounded-lg shadow-sm" required />
          </div>
          <div class="mt-4">
            <label class="block text-sm font-medium mb-1">Contraseña</label>
            <input v-model="form.password" type="password" :placeholder="isEditing ? 'Dejar en blanco para no cambiar' : ''" :required="!isEditing" class="w-full border-gray-300 rounded-lg shadow-sm" />
          </div>
          <div class="mt-4">
              <label class="block text-sm font-medium mb-1">Organización</label>
              <select v-model="form.organizationId" class="w-full border-gray-300 rounded-lg shadow-sm" :disabled="!authStore.user?.isSuperAdmin" required>
                <option v-for="org in organizations" :key="org.id" :value="org.id">{{ org.name }}</option>
              </select>
          </div>
          <div class="mt-4">
              <label class="block text-sm font-medium mb-1">Roles</label>
              <div class="grid grid-cols-2 gap-2">
                  <div v-for="role in availableRoles" :key="role.id">
                      <input type="checkbox" :id="'role_' + role.id" :value="role.id" v-model="form.roleIds" class="rounded"/>
                      <label :for="'role_' + role.id" class="ml-2">{{ role.name }}</label>
                  </div>
              </div>
          </div>
          <div class="flex justify-end space-x-3 mt-8">
            <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Cancelar</button>
            <button type="submit" class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Guardar</button>
          </div>
        </form>
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
  return date.toLocaleDateString('es-CO', { // Formato para Colombia
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
  }
};

const fetchRoles = async () => {
  try {
    allRoles.value = await roleService.getAll();
  } catch (error) {
    console.error("Error fetching roles:", error);
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
  }
};

const confirmDeleteUser = (id: string) => {
  if (window.confirm('Are you sure you want to delete this user?')) {
    deleteUser(id);
  }
};

const deleteUser = async (id: string) => {
  try {
    await userService.delete(id);
    await fetchUsers();
  } catch (error) {
    console.error("Error deleting user:", error);
    alert(`Error deleting user: ${(error as Error).message}`);
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

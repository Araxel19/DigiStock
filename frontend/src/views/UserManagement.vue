<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    <!-- Navigation Bar -->
    <nav class="bg-white shadow-sm border-b sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center space-x-8">
            <router-link to="/" class="text-xl font-semibold text-gray-900">DigiStock</router-link>
            <div class="hidden md:flex space-x-6">
              <router-link to="/" class="text-gray-600 hover:text-primary-600 transition-colors">Dashboard</router-link>
              <router-link v-if="authStore.isAdmin" to="/users" class="text-primary-600 font-medium">Usuarios</router-link>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">Hola, {{ authStore.user?.firstName }}</span>
            <button @click="logoutAndRedirect" class="p-2 rounded-full text-gray-500 hover:bg-red-100 hover:text-red-600 transition-colors" title="Cerrar Sesión">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900">Gestión de Usuarios</h2>
        <p class="text-gray-600 mt-1">Crea, actualiza y gestiona los usuarios del sistema.</p>
      </div>

      <div class="flex justify-between items-center mb-6">
        <div class="relative w-full max-w-xs">
          <input v-model="searchQuery" type="text" placeholder="Buscar por nombre o email..." class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500">
        </div>
        <button @click="openCreateModal" class="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors shadow">
          Nuevo Usuario
        </button>
      </div>

      <!-- Users Table -->
      <div class="bg-white rounded-xl shadow-soft overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
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
                  <span v-for="roleName in user.roles" :key="roleName" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
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
                <select v-model="form.organizationId" class="w-full border-gray-300 rounded-lg shadow-sm" required>
                  <option v-for="org in organizations" :key="org.id" :value="org.id">{{ org.name }}</option>
                </select>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium mb-1">Roles</label>
                <div class="grid grid-cols-2 gap-2">
                    <div v-for="role in allRoles" :key="role.id">
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { userService } from '@/services/user.service';
import { organizationService } from '@/services/organization.service';
import { roleService } from '@/services/role.service';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';
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
const router = useRouter();

function logoutAndRedirect() {
  authStore.logout();
  router.push('/login');
}

const users = ref<User[]>([]);
const organizations = ref<Organization[]>([]);
const allRoles = ref<Role[]>([]);
const showModal = ref(false);
const isEditing = ref(false);
const currentUser = ref<User | null>(null);
const searchQuery = ref('');

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

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value;
  const query = searchQuery.value.toLowerCase();
  return users.value.filter(user =>
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
    const allUsers = await userService.getAll();
    users.value = allUsers.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const fetchOrganizations = async () => {
  try {
    organizations.value = await organizationService.getAll();
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

const getOrganizationName = (orgId: string) => {
  const organization = organizations.value.find(org => org.id === orgId);
  return organization ? organization.name : 'N/A';
};

const resetForm = () => {
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    organizationId: '',
    roleIds: [],
  };
};

const openCreateModal = () => {
  isEditing.value = false;
  currentUser.value = null;
  resetForm();
  showModal.value = true;
};

const openEditModal = (user: User) => {
  isEditing.value = true;
  currentUser.value = user;
  form.value = { 
    ...user, 
    password: '', 
    organizationId: user.organizationId, 
    roleIds: allRoles.value.filter(role => user.roles.includes(role.name)).map(role => role.id)
  };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveUser = async () => {
  try {
    const payload = { ...form.value };
    if (isEditing.value && !payload.password) {
      delete (payload as any).password;
    }

    if (isEditing.value && currentUser.value) {
      await userService.update(currentUser.value.id, payload as FrontendUpdateUserDto);
    } else {
      await userService.create(payload as FrontendCreateUserDto);
    }

    closeModal();
    await fetchUsers();
  } catch (error) {
    console.error("Error saving user:", error);
    alert(`Error saving user: ${(error as Error).message}`);
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
  fetchUsers();
  fetchOrganizations();
  fetchRoles();
});
</script>
<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    <!-- =================================================================== -->
    <!-- Navigation Bar                                                      -->
    <!-- =================================================================== -->
    <nav class="bg-white shadow-sm border-b sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center space-x-8">
            <!-- Logo -->
            <router-link to="/" class="text-xl font-semibold text-gray-900">DigiStock</router-link>
            <!-- Links de Navegación -->
            <div class="hidden md:flex space-x-6">
              <router-link to="/" class="text-gray-600 hover:text-primary-600 transition-colors">Dashboard</router-link>
              <!-- Enlace 'Usuarios' resaltado como activo en esta vista -->
              <router-link v-if="authStore.user?.role === 'admin'" to="/users" class="text-primary-600 font-medium">Usuarios</router-link>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">Hola, {{ authStore.user?.firstName }}</span>
            <button
              @click="logoutAndRedirect"
              class="p-2 rounded-full text-gray-500 hover:bg-red-100 hover:text-red-600 transition-colors"
              title="Cerrar Sesión"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- =================================================================== -->
    <!-- Main Content (User CRUD)                                            -->
    <!-- =================================================================== -->
    <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900">Gestión de Usuarios</h2>
        <p class="text-gray-600 mt-1">Crea, actualiza y gestiona los usuarios del sistema.</p>
      </div>

      <!-- Controles y Búsqueda -->
      <div class="flex justify-between items-center mb-6">
        <div class="relative w-full max-w-xs">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
          </div>
          <input v-model="searchQuery" type="text" placeholder="Buscar por nombre o email..." class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500">
        </div>
        <button @click="openCreateModal" class="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors shadow">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          Nuevo Usuario
        </button>
      </div>

      <!-- Tabla de Usuarios -->
      <div class="bg-white rounded-xl shadow-soft overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Miembro Desde</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="paginatedUsers.length === 0">
              <td colspan="5" class="text-center py-10 text-gray-500">
                <span v-if="searchQuery">No se encontraron usuarios para "{{ searchQuery }}"</span>
                <span v-else>No hay usuarios registrados.</span>
              </td>
            </tr>
            <tr v-for="user in paginatedUsers" :key="user.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold">
                    {{ user.firstName.charAt(0) }}{{ user.lastName.charAt(0) }}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ user.firstName }} {{ user.lastName }}</div>
                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="user.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ user.isActive ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(user.createdAt) }}</td>
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

      <!-- Paginación -->
      <div v-if="totalPages > 1" class="flex justify-between items-center mt-6">
        <span class="text-sm text-gray-600">
          Mostrando {{ paginatedUsers.length }} de {{ filteredUsers.length }} usuarios
        </span>
        <div class="flex space-x-2">
          <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1 border rounded-md disabled:opacity-50">Anterior</button>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 py-1 border rounded-md disabled:opacity-50">Siguiente</button>
        </div>
      </div>

      <!-- Modal para crear/editar usuario -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity">
        <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md transform transition-all">
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
            <div class="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label class="block text-sm font-medium mb-1">Rol</label>
                <select v-model="form.role" class="w-full border-gray-300 rounded-lg shadow-sm">
                  <option value="admin">Admin</option>
                  <option value="user">Usuario</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Estado</label>
                <div class="flex items-center p-2 border border-gray-300 rounded-lg">
                    <input type="checkbox" v-model="form.isActive" id="isActiveToggle" class="hidden">
                    <label for="isActiveToggle" class="flex items-center cursor-pointer w-full">
                      <div class="relative">
                        <div class="w-10 h-4 bg-gray-200 rounded-full shadow-inner"></div>
                        <div :class="{'translate-x-6 bg-primary-600': form.isActive, 'bg-gray-400': !form.isActive}" class="absolute w-6 h-6 rounded-full shadow -left-1 -top-1 transition-transform"></div>
                      </div>
                      <div class="ml-3 text-sm text-gray-600">{{ form.isActive ? 'Activo' : 'Inactivo' }}</div>
                    </label>
                </div>
              </div>
            </div>
            <div class="flex justify-end space-x-3 mt-8">
              <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Cancelar</button>
              <button type="submit" class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Guardar Cambios</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useUserService } from '@/services/user.service';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

// --- LÓGICA DE NAVEGACIÓN Y AUTENTICACIÓN ---
const authStore = useAuthStore();
const router = useRouter();

function logoutAndRedirect() {
  authStore.logout();
  router.push('/login');
}

// --- INTERFACES Y TIPOS ---
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// --- ESTADO REACTIVO DEL CRUD ---
const userService = useUserService();
const users = ref<User[]>([]);
const showModal = ref(false);
const isEditing = ref(false);
const currentUser = ref<User | null>(null);
const searchQuery = ref('');

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  role: 'user' as 'admin' | 'user',
  password: '',
  isActive: true,
});

// --- LÓGICA DE PAGINACIÓN ---
const currentPage = ref(1);
const itemsPerPage = ref(7);
const totalPages = computed(() => {
  if (filteredUsers.value.length === 0) return 1;
  return Math.ceil(filteredUsers.value.length / itemsPerPage.value);
});

// --- PROPIEDADES COMPUTADAS ---
const filteredUsers = computed(() => {
  if (!searchQuery.value) {
    return users.value;
  }
  const query = searchQuery.value.toLowerCase();
  return users.value.filter(user =>
    user.firstName.toLowerCase().includes(query) ||
    user.lastName.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query)
  );
});

const paginatedUsers = computed(() => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = 1;
  }
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredUsers.value.slice(start, end);
});

// --- MÉTODOS DEL CRUD ---
const fetchUsers = async () => {
  try {
    const allUsers = await userService.getAll();
    // CORRECCIÓN: Se añaden los tipos explícitos para 'a' y 'b' para solucionar el error de TypeScript.
    users.value = allUsers.sort((a: User, b: User) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const resetForm = () => {
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    role: 'user',
    password: '',
    isActive: true,
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
  form.value = { ...user, password: '' };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveUser = async () => {
  try {
    // Construir un objeto de transferencia de datos (DTO) limpio para enviar a la API.
    // Esto evita enviar campos innecesarios o no modificables como 'id' o 'createdAt' en el cuerpo de la solicitud.
    const userPayload: {
      firstName: string;
      lastName: string;
      email: string;
      role: 'admin' | 'user';
      isActive: boolean;
      password?: string;
    } = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      role: form.value.role,
      isActive: form.value.isActive,
    };

    // Solo incluir la contraseña si se ha introducido una.
    if (form.value.password && form.value.password.length > 0) {
      userPayload.password = form.value.password;
    }

    if (isEditing.value && currentUser.value) {
      // Llamada a la API para actualizar
      await userService.update(currentUser.value.id, userPayload);
    } else {
      // Llamada a la API para crear
      await userService.create(userPayload);
    }

    closeModal();
    await fetchUsers();
  } catch (error: any) {
    console.error("Error al guardar el usuario:", error);
    // Mostrar un error visible para el usuario, ya que antes fallaba silenciosamente.
    alert(`Hubo un error al guardar los cambios: ${error.message || 'Revisa la consola del navegador para más detalles.'}`);
  }
};

const confirmDeleteUser = (id: string) => {
  if (window.confirm('¿Estás seguro de que quieres eliminar este usuario? Esta acción no se puede deshacer.')) {
    deleteUser(id);
  }
};

const deleteUser = async (id: string) => {
  try {
    await userService.delete(id);
    await fetchUsers();
  } catch (error: any) {
    console.error("Error al eliminar el usuario:", error);
    // Mostrar un error visible para el usuario.
    alert(`Hubo un error al eliminar el usuario: ${error.message || 'Revisa la consola del navegador para más detalles.'}`);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// --- CICLO DE VIDA ---
onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.shadow-soft {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07);
}
</style>


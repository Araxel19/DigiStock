<template>
  <div class="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
    <div class="bg-white shadow-lg rounded-lg overflow-hidden">
      <div class="p-6 sm:p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Mi Perfil</h2>
        <p class="text-gray-600 mb-6">Aquí puedes ver y editar tu información personal.</p>

        <div v-if="user" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div class="md:col-span-1">
              <label class="text-sm font-medium text-gray-500">Nombre</label>
            </div>
            <div class="md:col-span-2">
              <input v-model="editableUser.firstName" :disabled="!isEditing" type="text"
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                :class="isEditing ? 'border-gray-300' : 'border-transparent bg-gray-50'" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div class="md:col-span-1">
              <label class="text-sm font-medium text-gray-500">Apellido</label>
            </div>
            <div class="md:col-span-2">
              <input v-model="editableUser.lastName" :disabled="!isEditing" type="text"
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                :class="isEditing ? 'border-gray-300' : 'border-transparent bg-gray-50'" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div class="md:col-span-1">
              <label class="text-sm font-medium text-gray-500">Correo Electrónico</label>
            </div>
            <div class="md:col-span-2">
              <p class="text-gray-800 sm:text-sm">{{ user.email }}</p>
              <p class="text-xs text-gray-500 mt-1">El correo electrónico no se puede modificar.</p>
            </div>
          </div>

          <div v-if="user.organizationId" class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div class="md:col-span-1">
              <label class="text-sm font-medium text-gray-500">Organización</label>
            </div>
            <div class="md:col-span-2">
              <p class="text-gray-800 sm:text-sm">
                {{ organizationName || 'Cargando...' }}
              </p>
              <p class="text-xs text-gray-500 mt-1">La organización no se puede modificar.</p>
            </div>
          </div>

          <div class="border-t border-gray-200 pt-6 flex justify-end space-x-3">
            <button v-if="isEditing" @click="cancelEdit"
              class="px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-md shadow-sm border border-gray-300 hover:bg-gray-50">
              Cancelar
            </button>
            <button v-if="isEditing" @click="saveProfile"
              class="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-primary-700">
              Guardar Cambios
            </button>
            <button v-if="!isEditing" @click="isEditing = true"
              class="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-primary-700">
              Editar Perfil
            </button>
          </div>

          <div v-if="successMessage" class="p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-600">
            {{ successMessage }}
          </div>
          <div v-if="errorMessage" class="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {{ errorMessage }}
          </div>
        </div>

        <div v-else class="text-center py-10">
          <p>Cargando perfil...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useAuthStore } from '@/store/auth';
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
      organizationName.value = org.name; // 👈 guarda el nombre real
    } catch (err) {
      console.error('Error al obtener la organización:', err);
      organizationName.value = 'Desconocida';
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
  }
};
</script>

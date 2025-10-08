<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center space-x-8">
            <router-link to="/dashboard" class="text-xl font-semibold text-gray-900">
              DigiStock
            </router-link>
            <nav class="hidden md:flex space-x-8">
              <router-link
                to="/dashboard"
                class="text-gray-600 hover:text-gray-900 transition-colors"
                active-class="text-primary-600 font-medium"
              >
                Dashboard
              </router-link>

              <!-- Links for non-Super Admins -->
              <router-link
                v-if="showInventoryLink"
                to="/inventory"
                class="text-gray-600 hover:text-gray-900 transition-colors"
                active-class="text-primary-600 font-medium"
              >
                Inventario
              </router-link>
              <router-link
                v-if="showUploadLink"
                to="/upload"
                class="text-gray-600 hover:text-gray-900 transition-colors"
                active-class="text-primary-600 font-medium"
              >
                Subir Planilla
              </router-link>
              <router-link
                v-if="showMyPlanillasLink"
                to="/my-planillas"
                class="text-gray-600 hover:text-gray-900 transition-colors"
                active-class="text-primary-600 font-medium"
              >
                Mis Planillas
              </router-link>

              <!-- Links for Super Admins -->
              <router-link
                v-if="showOrganizationsLink"
                to="/organizations"
                class="text-gray-600 hover:text-gray-900 transition-colors"
                active-class="text-primary-600 font-medium"
              >
                Organizaciones
              </router-link>

              <!-- Links for Admins -->
              <router-link
                v-if="showUsersLink"
                to="/users"
                class="text-gray-600 hover:text-gray-900 transition-colors"
                active-class="text-primary-600 font-medium"
              >
                Usuarios
              </router-link>
              <router-link
                v-if="showLocationsLink"
                to="/locations"
                class="text-gray-600 hover:text-gray-900 transition-colors"
                active-class="text-primary-600 font-medium"
              >
                Ubicaciones
              </router-link>

              <router-link
                v-if="showCategoriesLink"
                to="/categories"
                class="text-gray-600 hover:text-gray-900 transition-colors"
                active-class="text-primary-600 font-medium"
              >
                Categorías
              </router-link>
              
            </nav>
          </div>
          <div class="flex items-center space-x-4 relative">
            <div @click="toggleDropdown" class="cursor-pointer">
              <span class="text-sm text-gray-600">{{ authStore.user?.firstName }}</span>
              <svg class="w-5 h-5 inline-block text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
            <div v-if="isDropdownOpen" class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20 top-full">
              <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mi Perfil</router-link>
              <a @click="logoutAndRedirect" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer">Cerrar Sesión</a>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const isDropdownOpen = ref(false)
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const userRoles = computed(() => authStore.user?.roles || [])
const isSuperAdmin = computed(() => authStore.isSuperAdmin)

const showInventoryLink = computed(() =>
  userRoles.value.some((r:any) => ['org_admin', 'supervisor', 'data_entry'].includes(r))
)

const showCategoriesLink = computed(() =>
  isSuperAdmin.value || userRoles.value.includes('org_admin')
);

const showUploadLink = computed(() =>
  userRoles.value.some((r:any) => ['org_admin', 'supervisor', 'data_entry'].includes(r))
)

const showMyPlanillasLink = computed(() =>
  userRoles.value.includes('data_entry')
)

const showOrganizationsLink = computed(() => isSuperAdmin.value)
const showUsersLink = computed(() =>
  isSuperAdmin.value || userRoles.value.includes('org_admin')
)
const showLocationsLink = computed(() =>
  isSuperAdmin.value || userRoles.value.includes('org_admin')
)

const logoutAndRedirect = () => {
  authStore.logout()
  router.push('/login')
}

</script>

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
            </nav>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">{{ authStore.user?.firstName }}</span>
            <button
              @click="logoutAndRedirect"
              class="text-sm text-red-600 hover:text-red-800 transition-colors"
            >
              Cerrar Sesión
            </button>
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
import { computed } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const userRoles = computed(() => authStore.user?.roles || [])
const isSuperAdmin = computed(() => authStore.isSuperAdmin)

const showInventoryLink = computed(() => {
  return userRoles.value.includes('org_admin') || userRoles.value.includes('supervisor') || userRoles.value.includes('data_entry')
})

const showUploadLink = computed(() => {
  return userRoles.value.includes('org_admin') || userRoles.value.includes('supervisor') || userRoles.value.includes('data_entry')
})

const showOrganizationsLink = computed(() => {
  return isSuperAdmin.value
})

const showUsersLink = computed(() => {
  return isSuperAdmin.value || userRoles.value.includes('org_admin')
})

const logoutAndRedirect = () => {
  authStore.logout()
  router.push('/login')
}
</script>

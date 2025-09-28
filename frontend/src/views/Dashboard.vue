<template>
  <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 relative">
    <div v-if="isLoading" class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
      <div class="flex items-center space-x-2">
        <svg class="animate-spin h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="text-gray-600">Cargando datos...</span>
      </div>
    </div>

    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Dashboard</h2>
      <p class="text-gray-600">
        {{ authStore.user?.isSuperAdmin ? 'Resumen global del sistema' : 'Resumen del sistema de digitalización de inventario' }}
      </p>
    </div>

    <div v-if="authStore.user?.isSuperAdmin">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white p-6 rounded-xl shadow-soft">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-sky-100">
              <svg class="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Organizaciones</p>
              <p class="text-2xl font-semibold text-gray-900">{{ superAdminStats.totalOrganizations }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <router-link
          to="/organizations"
          class="bg-white p-6 rounded-xl shadow-soft hover:shadow-lg transition-all cursor-pointer group"
        >
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-sky-100 group-hover:bg-sky-200 transition-colors">
              <svg class="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Gestionar Organizaciones</h3>
              <p class="text-gray-600">Administrar organizaciones del sistema</p>
            </div>
          </div>
        </router-link>
        <router-link
          to="/users"
          class="bg-white p-6 rounded-xl shadow-soft hover:shadow-lg transition-all cursor-pointer group"
        >
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.176-5.97M15 21h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.176-5.97m-3.215 0A2.986 2.986 0 017 15h1.518"></path></svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Gestionar Usuarios</h3>
              <p class="text-gray-600">Crear, editar y eliminar usuarios</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white p-6 rounded-xl shadow-soft">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-primary-100">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Productos</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.totalProducts }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-soft">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-secondary-100">
              <svg class="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Planillas Procesadas</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.processedPlanillas }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-soft">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-yellow-100">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Planillas Pendientes</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.pendingPlanillas }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-soft">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Éxito OCR</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.ocrSuccessRate }}%</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <router-link
          v-if="canPerformAction('Subir Planilla')"
          to="/upload"
          class="bg-white p-6 rounded-xl shadow-soft hover:shadow-lg transition-all cursor-pointer group"
        >
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-primary-100 group-hover:bg-primary-200 transition-colors">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Subir Planilla</h3>
              <p class="text-gray-600">Digitalizar nueva planilla de inventario</p>
            </div>
          </div>
        </router-link>

        <router-link
          v-if="canPerformAction('Ver Inventario')"
          to="/inventory"
          class="bg-white p-6 rounded-xl shadow-soft hover:shadow-lg transition-all cursor-pointer group"
        >
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-secondary-100 group-hover:bg-secondary-200 transition-colors">
              <svg class="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Ver Inventario</h3>
              <p class="text-gray-600">Consultar productos digitalizados</p>
            </div>
          </div>
        </router-link>

        <router-link
          v-if="canPerformAction('Gestionar Usuarios')"
          to="/users"
          class="bg-white p-6 rounded-xl shadow-soft hover:shadow-lg transition-all cursor-pointer group"
        >
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.176-5.97M15 21h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.176-5.97m-3.215 0A2.986 2.986 0 017 15h1.518"></path></svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Gestionar Usuarios</h3>
              <p class="text-gray-600">Crear, editar y eliminar usuarios</p>
            </div>
          </div>
        </router-link>
      </div>
      
      <div v-if="pendingPlanillas.length > 0" class="bg-white rounded-xl shadow-soft">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Planillas Pendientes de Validación</h3>
        </div>
        <div class="p-6">
          <table class="min-w-full">
            <thead>
              <tr>
                <th class="text-left">Archivo</th>
                <th class="text-left">Fecha de Carga</th>
                <th class="text-left">Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="planilla in pendingPlanillas" :key="planilla.id">
                <td>{{ planilla.fileName }}</td>
                <td>{{ new Date(planilla.uploadedAt).toLocaleString() }}</td>
                <td>
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    {{ planilla.status }}
                  </span>
                </td>
                <td>
                  <router-link :to="{ name: 'ValidarPlanilla', params: { id: planilla.id } }" class="text-primary-600 hover:text-primary-900">
                    Validar
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-soft mt-8">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Actividad Reciente</h3>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="activity in recentActivity" :key="activity.id" class="flex items-center space-x-3">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="{ 'bg-primary-100': activity.type === 'planilla', 'bg-green-100': activity.type === 'product' }">
                  <svg v-if="activity.type === 'planilla'" class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                  <svg v-else-if="activity.type === 'product'" class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
                <p class="text-sm text-gray-500">{{ activity.description }}</p>
              </div>
              <div class="flex-shrink-0 text-sm text-gray-400">{{ activity.time }}</div>
            </div>
            <div v-if="!isLoading && recentActivity.length === 0" class="text-center text-gray-500 py-4">
              No hay actividad reciente.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/store/auth'
import { inventoryService } from '@/services/inventory.service'
import { organizationService } from '@/services/organization.service'
import { Planilla } from '@/types/inventory'

const authStore = useAuthStore()
const isLoading = ref(true)

// Stats for Super Admin
const superAdminStats = ref({
  totalOrganizations: 0,
})

// Stats for Organization Users
const stats = ref({
  totalProducts: 0,
  processedPlanillas: 0,
  pendingPlanillas: 0,
  ocrSuccessRate: 0,
})

const recentActivity = ref<any[]>([])
const pendingPlanillas = ref<Planilla[]>([])

const userRoles = computed(() => authStore.user?.roles || [])

const canPerformAction = (action: 'Subir Planilla' | 'Ver Inventario' | 'Gestionar Usuarios') => {
  if (authStore.user?.isSuperAdmin) {
      if (action === 'Gestionar Usuarios') return true;
      return false;
  }

  const roles = userRoles.value
  switch (action) {
    case 'Subir Planilla':
      return roles.includes('org_admin') || roles.includes('supervisor') || roles.includes('data_entry')
    case 'Ver Inventario':
      return roles.includes('org_admin') || roles.includes('supervisor')
    case 'Gestionar Usuarios':
      return roles.includes('org_admin')
    default:
      return false
  }
}

async function loadSuperAdminData() {
  try {
    const orgs = await organizationService.getAll()
    superAdminStats.value.totalOrganizations = orgs.length
  } catch (error) {
    console.error("Error fetching organizations count:", error)
  }
  recentActivity.value = []
}

async function loadInventoryData() {
  try {
    const [products, planillas] = await Promise.all([
      inventoryService.getProducts(),
      inventoryService.getPlanillas(),
    ])

    stats.value.totalProducts = products.length
    stats.value.processedPlanillas = planillas.filter(p => p.status === 'procesado').length
    stats.value.pendingPlanillas = planillas.filter(p => p.status === 'validacion_pendiente').length
    pendingPlanillas.value = planillas.filter(p => p.status === 'validacion_pendiente');

    const recentPlanillas = planillas
      .filter(p => p.status === 'procesado' && p.processedAt)
      .sort((a, b) => new Date(b.processedAt!).getTime() - new Date(a.processedAt!).getTime())
      .slice(0, 2)
      .map(p => ({
        id: `p-${p.id}`,
        type: 'planilla',
        title: 'Planilla procesada',
        description: `${p.fileName}`,
        time: new Date(p.processedAt!).toLocaleString(),
      }))

    const recentProducts = products
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3)
      .map(p => ({
        id: `prod-${p.id}`,
        type: 'product',
        title: 'Nuevo producto agregado',
        description: `${p.code} - ${p.name}`,
        time: new Date(p.createdAt).toLocaleString(),
      }))
    
    recentActivity.value = [...recentPlanillas, ...recentProducts]
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 5)

  } catch (error) {
    console.error('Error loading inventory data:', error)
    // Clear data on error to avoid showing stale information
    stats.value = { totalProducts: 0, processedPlanillas: 0, pendingPlanillas: 0, ocrSuccessRate: 0 }
    recentActivity.value = []
  }
}

async function loadDashboardData() {
  isLoading.value = true
  try {
    if (authStore.user?.isSuperAdmin) {
      await loadSuperAdminData()
    } else {
      await loadInventoryData()
    }
  } catch (error) {
      console.error('Error loading dashboard data:', error)
  }
  finally {
    isLoading.value = false
  }
}


onMounted(() => {
  loadDashboardData()
})
</script>
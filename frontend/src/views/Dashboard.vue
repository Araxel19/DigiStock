<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-900">DigiStock</h1>
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
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 relative">
      <!-- Loading Overlay -->
      <div v-if="isLoading" class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
        <div class="flex items-center space-x-2">
          <svg class="animate-spin h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-gray-600">Cargando datos...</span>
        </div>
      </div>

      <!-- Header -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p class="text-gray-600">Resumen del sistema de digitalización de inventario</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white p-6 rounded-xl shadow-soft">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-primary-100">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
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
              <svg class="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
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
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
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
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Éxito OCR</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.ocrSuccessRate }}%</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <router-link
          to="/upload"
          class="bg-white p-6 rounded-xl shadow-soft hover:shadow-lg transition-all cursor-pointer group"
        >
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-primary-100 group-hover:bg-primary-200 transition-colors">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Subir Planilla</h3>
              <p class="text-gray-600">Digitalizar nueva planilla de inventario</p>
            </div>
          </div>
        </router-link>

        <router-link
          to="/inventory"
          class="bg-white p-6 rounded-xl shadow-soft hover:shadow-lg transition-all cursor-pointer group"
        >
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-secondary-100 group-hover:bg-secondary-200 transition-colors">
              <svg class="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Ver Inventario</h3>
              <p class="text-gray-600">Consultar productos digitalizados</p>
            </div>
          </div>
        </router-link>

        <!-- Solo visible para admin -->
        <router-link
          v-if="authStore.isAdmin"
          to="/users"
          class="bg-white p-6 rounded-xl shadow-soft hover:shadow-lg transition-all cursor-pointer group"
        >
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Gestionar Usuarios</h3>
              <p class="text-gray-600">Crear, editar y eliminar usuarios</p>
            </div>
          </div>
        </router-link>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white rounded-xl shadow-soft">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Actividad Reciente</h3>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="activity in recentActivity" :key="activity.id" class="flex items-center space-x-3">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="{
                  'bg-primary-100': activity.type === 'planilla',
                  'bg-green-100': activity.type === 'product',
                }">
                  <svg v-if="activity.type === 'planilla'" class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <svg v-else-if="activity.type === 'product'" class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                  </svg>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
                <p class="text-sm text-gray-500">{{ activity.description }}</p>
              </div>
              <div class="flex-shrink-0 text-sm text-gray-400">
                {{ activity.time }}
              </div>
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
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'
import { inventoryService } from '@/services/inventory.service'
//import type { Product, Planilla } from '@/types/inventory'

const authStore = useAuthStore()
const router = useRouter()

function logoutAndRedirect() {
  authStore.logout()
  router.push('/login')
}

const stats = ref({
  totalProducts: 0,
  processedPlanillas: 0,
  pendingPlanillas: 0,
  ocrSuccessRate: 0 // This will remain 0 for now
})

const recentActivity = ref<any[]>([])
const isLoading = ref(true)

async function loadDashboardData() {
  isLoading.value = true
  try {
    const [products, planillas] = await Promise.all([
      inventoryService.getProducts(),
      inventoryService.getPlanillas()
    ])

    // Calculate stats
    stats.value.totalProducts = products.length
    stats.value.processedPlanillas = planillas.filter(p => p.status === 'procesado').length
    stats.value.pendingPlanillas = planillas.filter(p => p.status === 'validacion_pendiente').length

    // Generate recent activity
    const recentPlanillas = planillas
      .filter(p => p.status === 'procesado' && p.processedAt)
      .sort((a, b) => new Date(b.processedAt!).getTime() - new Date(a.processedAt!).getTime())
      .slice(0, 2)
      .map(p => ({
        id: `p-${p.id}`,
        type: 'planilla',
        title: 'Planilla procesada',
        description: `${p.fileName} - ${p.items.length} productos`,
        time: new Date(p.processedAt!).toLocaleString()
      }))

    const recentProducts = products
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3)
      .map(p => ({
        id: `prod-${p.id}`,
        type: 'product',
        title: 'Nuevo producto agregado',
        description: `${p.code} - ${p.name}`,
        time: new Date(p.createdAt).toLocaleString()
      }))
    
    recentActivity.value = [...recentPlanillas, ...recentProducts]
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 5)

  } catch (error) {
    console.error('Error loading dashboard data:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadDashboardData()
})
</script>

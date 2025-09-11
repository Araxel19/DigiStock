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
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
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
          v-if="authStore.user?.role === 'admin'"
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
                <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
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

const authStore = useAuthStore()
const router = useRouter()

function logoutAndRedirect() {
  authStore.logout()
  router.push('/login')
}

const stats = ref({
  totalProducts: 156,
  processedPlanillas: 24,
  pendingPlanillas: 3,
  ocrSuccessRate: 94
})

const recentActivity = ref([
  {
    id: 1,
    title: 'Planilla procesada',
    description: 'planilla_inventario_2024.jpg - 15 productos extraídos',
    time: 'hace 2 horas'
  },
  {
    id: 2,
    title: 'Nuevo producto agregado',
    description: 'PROD004 - Monitor Samsung 24"',
    time: 'hace 4 horas'
  },
  {
    id: 3,
    title: 'Flujo n8n ejecutado',
    description: 'Sincronización automática completada',
    time: 'hace 6 horas'
  }
])

onMounted(() => {
  // Cargar estadísticas reales aquí
})
</script>
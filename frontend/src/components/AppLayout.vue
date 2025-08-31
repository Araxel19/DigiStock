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
              <router-link
                to="/inventory"
                class="text-gray-600 hover:text-gray-900 transition-colors"
                active-class="text-primary-600 font-medium"
              >
                Inventario
              </router-link>
              <router-link
                to="/upload"
                class="text-gray-600 hover:text-gray-900 transition-colors"
                active-class="text-primary-600 font-medium"
              >
                Subir Planilla
              </router-link>
            </nav>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">{{ authStore.user?.firstName }}</span>
            <button
              @click="authStore.logout"
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
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()
</script>